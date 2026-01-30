import ProductsPage from "@/components/templates/";

export default async function EditItemPage({ params }: { readonly params: Promise<{ item_id: string }> }) {
  const { item_id } = await params;
  return <ProductsPage item_id={item_id} />;
}
