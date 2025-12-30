import { SiteHeader } from "@/components/site-header";
import ProductTemp from '@/components/templates/ProductTemp';

export default function ItemsPage() {
  return (
    <>
      <SiteHeader title="Products" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <ProductTemp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
