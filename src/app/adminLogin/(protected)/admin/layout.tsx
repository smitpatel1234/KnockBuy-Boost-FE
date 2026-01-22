"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useSocket } from "@/hooks/useSocket";




export default function RootLayout({
  children,
}: React.PropsWithChildren) {
  const { numnotification, setnumnotification ,} = useSocket();
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" numnotification={numnotification} setnumnotification={setnumnotification} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
