
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import OrderTemp from '@/components/templates/OrderTemp';
export default function OrderPage() {
  return (
        <>
      <SiteHeader title="Order" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <OrderTemp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
