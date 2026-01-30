
import PublicLayoutContent from "@/components/layouts/PublicLayoutContent";
export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
      <PublicLayoutContent>{children}</PublicLayoutContent>
  );
}
