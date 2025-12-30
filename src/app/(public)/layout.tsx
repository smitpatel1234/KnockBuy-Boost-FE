import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Store",
  description: "Online store",
};
import Header from "@/components/organisms/Header";
export default function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-50 font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           <Header />
         

          {/* Page Content */}
          <main className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
