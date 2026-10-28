
import { readFile } from "node:fs/promises";
import type { PaymentTestCase } from "../types/payment.js";

function isPaymentTestCase(
  value: unknown
): value is PaymentTestCase {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.description === "string" &&
    ["SEPA", "BACS", "SWIFT"].includes(
      String(item.scheme)
    ) &&
    typeof item.amount === "string" &&
    typeof item.currency === "string" &&
    typeof item.endToEndId === "string" &&
    typeof item.debtorAccount === "string" &&
    typeof item.creditorAccount === "string" &&
    typeof item.expectedStatusCode === "number" &&
    (
      item.expectedPaymentStatus === undefined ||
      typeof item.expectedPaymentStatus === "string"
    ) &&
    (
      item.expectedError === undefined ||
      typeof item.expectedError === "string"
    )
  );
}

export async function loadPaymentData(
  relativePath: string
): Promise<PaymentTestCase[]> {
  const fileUrl = new URL(relativePath, import.meta.url);
  const contents = await readFile(fileUrl, "utf8");

  const data: unknown = JSON.parse(contents);

  if (
    !Array.isArray(data) ||
    !data.every(isPaymentTestCase)
  ) {
    throw new Error(
      `Invalid payment test data: ${relativePath}`
    );
  }

  return data;
}

export function loadPayments(): Promise<PaymentTestCase[]> {
  return loadPaymentData("../test-data/payments.json");
}