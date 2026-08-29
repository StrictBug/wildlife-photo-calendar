export const DISPLAY_CURRENCIES = [
  "AUD",
  "USD",
  "EUR",
  "GBP",
  "NZD",
  "CAD",
  "JPY",
] as const;

export type DisplayCurrency = (typeof DISPLAY_CURRENCIES)[number];

export const DEFAULT_CURRENCY: DisplayCurrency = "AUD";

/** Rough units of each currency per 1 AUD (for estimate display only). */
const AUD_TO: Record<DisplayCurrency, number> = {
  AUD: 1,
  USD: 0.66,
  EUR: 0.61,
  GBP: 0.52,
  NZD: 1.09,
  CAD: 0.9,
  JPY: 98,
};

const LOCALES: Record<DisplayCurrency, string> = {
  AUD: "en-AU",
  USD: "en-US",
  EUR: "en-IE",
  GBP: "en-GB",
  NZD: "en-NZ",
  CAD: "en-CA",
  JPY: "ja-JP",
};

export const CURRENCY_LABELS: Record<DisplayCurrency, string> = {
  AUD: "AUD — Australian dollar",
  USD: "USD — US dollar",
  EUR: "EUR — Euro",
  GBP: "GBP — British pound",
  NZD: "NZD — New Zealand dollar",
  CAD: "CAD — Canadian dollar",
  JPY: "JPY — Japanese yen",
};

export function isDisplayCurrency(value: string): value is DisplayCurrency {
  return (DISPLAY_CURRENCIES as readonly string[]).includes(value);
}

export function fromAUD(
  amountAUD: number,
  currency: DisplayCurrency,
): number {
  return amountAUD * AUD_TO[currency];
}

export function formatMoney(
  amount: number,
  currency: DisplayCurrency,
): string {
  return new Intl.NumberFormat(LOCALES[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
