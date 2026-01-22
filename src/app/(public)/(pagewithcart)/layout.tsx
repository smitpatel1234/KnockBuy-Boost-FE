import type { Metadata } from "next";

import PublicLayoutContent from "@/components/layouts/PublicLayoutContent";
export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
      <PublicLayoutContent>{children}</PublicLayoutContent>
  );
}
