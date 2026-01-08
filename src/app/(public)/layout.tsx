import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Store",
  description: "Online store",
};
import Header from "@/components/organisms/Header";
export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      <Toaster />
    </ThemeProvider>
  );
}
