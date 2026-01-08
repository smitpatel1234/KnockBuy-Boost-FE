
import { SiteHeader } from "@/components/site-header";
import VarientConfigPage from "@/components/templates/varientConfigPage";
export default function varientPage() {
  return (
        <>
      <SiteHeader title="Products" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4">
              <VarientConfigPage />
          </div>
        </div>
      </div>
    </>
  );
}
