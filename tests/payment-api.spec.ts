
import { expect, test } from "@playwright/test";
import { loadPayments } from "../utils/data-loader.js";
import type { PaymentApiResponse } from "../types/payment.js";

const paymentsApiUrl = process.env.PAYMENTS_API_URL;
const payments = await loadPayments();

test.describe("Payments API", () => {
  for (const payment of payments) {
    test(`processes payment ${payment.id}`, async ({ request }) => {
      test.skip(
        !paymentsApiUrl,
        "Set PAYMENTS_API_URL to run payment API tests"
      );

      const response = await request.post(paymentsApiUrl!, {
        data: {
          scheme: payment.scheme,
          amount: payment.amount,
          currency: payment.currency,
          endToEndId: payment.endToEndId,
          debtorAccount: payment.debtorAccount,
          creditorAccount: payment.creditorAccount
        }
      });

      expect(response.status()).toBe(payment.expectedStatusCode);

      const body: unknown = await response.json();

      if (payment.expectedStatusCode === 201) {
        const createdPayment = body as PaymentApiResponse;

        expect(createdPayment).toMatchObject({
          amount: payment.amount,
          currency: payment.currency,
          status: payment.expectedPaymentStatus
        });

        expect(createdPayment.id).toBeTruthy();
      } else if (payment.expectedError) {
        expect(body).toMatchObject({
          error: {
            code: payment.expectedError
          }
        });
      }
    });
  }
});


