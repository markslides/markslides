import { defineRouting } from "next-intl/routing";

export const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  zh: "简体中文",
  ja: "日本語",
} as const;

export const LOCALES = Object.keys(LOCALE_NAMES);

export const DEFAULT_LOCALE = LOCALES[0];
export type LocalesType = (typeof LOCALES)[number];

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});
