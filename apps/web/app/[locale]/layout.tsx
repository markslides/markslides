import App from "@/components/base/App";
import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { type PropsWithChildren } from "react";
import "./globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}
interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}async function RootLayout(props: Props): Promise<JSX.Element> {
  const { children, params } = props;
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <App>{children}</App>
          <Toaster />
          <Script
            strategy="lazyOnload"
            src="https://cdn.jsdelivr.net/npm/@marp-team/marpit-svg-polyfill/lib/polyfill.browser.js"
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
