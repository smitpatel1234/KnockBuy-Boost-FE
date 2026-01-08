
import { SiteHeader } from "@/components/site-header";
import CategoterTemp from "@/components/templates/CategoryTemplate";
export default function Category() {
  return (
    <>
      <SiteHeader title="Category" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">

          <div className="px-4 lg:px-6">
            <CategoterTemp />
          </div>
        </div>
      </div>
    </>
  );
}
