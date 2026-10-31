export type PaymentScheme = "SEPA" | "BACS" | "SWIFT";

export interface PaymentTestCase {
  id: string;
  description: string;

  scheme: PaymentScheme;

  amount: string;
  currency: string;

  endToEndId: string;
  debtorAccount: string;
  creditorAccount: string;

  expectedStatusCode: number;
  expectedPaymentStatus?: string;
  expectedError?: string;
}

export interface PaymentApiResponse {
  id: string;
  amount: string;
  currency: string;
  method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

