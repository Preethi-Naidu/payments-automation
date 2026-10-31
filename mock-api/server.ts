
import express, {
  type Request,
  type Response,
  type NextFunction
} from "express";

import OpenApiValidator from "express-openapi-validator";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface ApiError extends Error {
  status?: number;
}

const app = express();
const port = Number(process.env.PORT ?? 3000);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// 1. Parse incoming JSON
app.use(express.json());

// 3. Health-check endpoint
app.get("/health", (_req: Request, res: Response) => {
  return res.status(200).json({ status: "OK" });
});


// 2. Validate requests and responses against OpenAPI
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(dirname, "../openapi/payment-api.yaml"),
    validateRequests: true,
    validateResponses: true
  })
);


// 4. Create payment endpoint
app.post("/payments", (req: Request, res: Response) => {
  const payment = req.body;

console.log("PAYMENT ROUTE REACHED:", payment);
console.log("AMOUNT:", payment.amount);
console.log("IS STRING:", typeof payment.amount === "string");
console.log(
  "REGEX MATCH:",
  typeof payment.amount === "string" &&
    /^-?\d+(\.\d{1,2})?$/.test(payment.amount)
);
console.log("NUMERIC VALUE:", Number(payment.amount));

console.log(
  "AMOUNT INVALID:",
  Number(payment.amount) <= 0
);

// Business validation: amount


if (
  typeof payment.amount !== "string" ||
  !/^-?\d+(\.\d{1,2})?$/.test(payment.amount) ||
  Number(payment.amount) <= 0
) {
  console.log("RETURNING INVALID_AMOUNT");

  return res.status(400).json({
    error: { code: "INVALID_AMOUNT" }
  });
}

  // Business validation: scheme and currency
  const supportedSchemes: Record<string, string[]> = {
    SEPA: ["EUR"],
    BACS: ["GBP"],
    SWIFT: ["EUR", "GBP", "USD"]
  };

  const currencies = supportedSchemes[payment.scheme];

  if (!currencies || !currencies.includes(payment.currency)) {
    return res.status(400).json({
      error: { code: "UNSUPPORTED_CURRENCY" }
    });
  }

  // Successful payment response
  const now = new Date().toISOString();

  return res.status(201).json({
    id: `PAY-${Date.now()}`,
    amount: payment.amount,
    currency: payment.currency,
    method: payment.scheme,
    status: "ACCEPTED",
    createdAt: now,
    updatedAt: now
  });
});

// 5. Centralised error-handling middleware
app.use(
  (
    err: ApiError,
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) {
      return next(err);
    }

    const status = err.status ?? 500;

    return res.status(status).json({
      error: {
        code:
          status === 400
            ? "INVALID_REQUEST"
            : "INTERNAL_ERROR"
      }
    });
  }
);

// 6. Start server
app.listen(port, () => {
  console.log(
    `Mock payment API running at http://localhost:${port}`
  );
});
