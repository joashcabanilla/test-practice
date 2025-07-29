import type { Metadata } from "next";

//CSS and Fonts
import "./globals.css";
import { Inter } from "next/font/google";

/**
 * PROVIDER WRAPPER
 */
import { ThemeProvider } from "@/provider/theme-provider";
import { ApolloProviderWrapper } from "@/provider/apollo-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "frontend-qualification-exercises",
  description: "frontend qualification exercises"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
          <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
