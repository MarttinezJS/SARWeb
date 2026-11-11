const LOCALE = "es-CO";

const parse = (value: string | null | undefined): Date | undefined => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

/** 11 de noviembre de 2026 */
export const formatDate = (value: string | null | undefined): string =>
  parse(value)?.toLocaleDateString(LOCALE, { dateStyle: "long" }) ?? "";

/** 11 nov 2026 */
export const formatShortDate = (value: string | null | undefined): string =>
  parse(value)?.toLocaleDateString(LOCALE, { dateStyle: "medium" }) ?? "";

/** 11 nov 2026, 7:35 a. m. */
export const formatDateTime = (value: string | null | undefined): string =>
  parse(value)?.toLocaleString(LOCALE, { dateStyle: "medium", timeStyle: "short" }) ?? "";

/** 7:35 a. m. */
export const formatTime = (value: string | null | undefined): string =>
  parse(value)?.toLocaleTimeString(LOCALE, { timeStyle: "short" }) ?? "";
