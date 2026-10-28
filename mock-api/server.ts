
import express, { type Request, type Response } from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.post("/payments", (req: Request, res: Response) => {
  const payment = req.body;

  if (!payment || typeof payment !== "object") {
    return res.status(400).json({
      error: { code: "INVALID_REQUEST" }
    });
  }

  if (
    typeof payment.amount !== "string" ||
    !/^\d+(\.\d{1,2})?$/.test(payment.amount) ||
    Number(payment.amount) <= 0
  ) {
    return res.status(400).json({
      error: { code: "INVALID_AMOUNT" }
    });
  }

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

  return res.status(201).json({
    id: `PAY-${Date.now()}`,
    amount: payment.amount,
    currency: payment.currency,
    method: payment.scheme,
    status: "ACCEPTED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Mock payment API running at http://localhost:${port}`);
});
