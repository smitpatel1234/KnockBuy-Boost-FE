import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/organisms/Header";

export const metadata: Metadata = {
  title: "Store",
  description: "Online store",
};
export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
        <Header />
        {children}
      <Toaster />
    </ThemeProvider>
  );
}
