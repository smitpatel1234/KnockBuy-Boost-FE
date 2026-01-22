import UserProductpage from "@/components/organisms/products/UserProductpage";

export default async function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserProductpage slug={id} />;
}
