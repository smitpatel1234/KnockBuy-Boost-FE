import ProductsPage from "@/components/templates/ProductsPage";

export default async function EditItemPage({ params }: { params: Promise<{ item_id: string }> }) {
  const { item_id } = await params;
  return <ProductsPage item_id={item_id} />;
}
