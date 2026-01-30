"use client";

import React, { useEffect } from "react";
import ProductsDiscription from "../organisms/products/ProductsDiscription";
import ProductsPrice from "../organisms/products/ProductsDynamic";
import { ProductImage } from "../organisms/products/ProductImage";
import VarientProduct from "../organisms/products/VarientProduct";
import VariantCollectionComponent from "../organisms/products/VariantCollectionComponent";
import { Button } from "../atoms/Button";
import { useItemForm } from "@/hooks/useItemForm";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loading as setLoading } from "@/redux/features/item-slice";
import { fetchVariantData } from "@/redux/features/variant-slice";
import { fetchCategoriesAll } from "@/redux/features/category-slice";
import { getItem } from "@/services/item.service";
import type { ProductsPageProps } from "@/types/product-display.types";
import LoadingProduct from "../organisms/products/LoadingProduct";
import Section from "../molecules/Section";
export default function ProductsPage({ item_id }: Readonly<ProductsPageProps>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading ,error} = useAppSelector((state) => state.item);

  const handleOnClose = () => {
    router.push("/adminLogin/admin/item");
  };

  const formik = useItemForm({
    onClose: handleOnClose,
  });
   const fetchItem = async () => {
      if (!item_id) { return;}
       dispatch(setLoading(true));
      const res = await getItem(item_id);
       dispatch(setLoading(false));
      if (res.data.message === "Unauthorized") {
        router.push("/adminLogin/admin");
        return;
      }

      const data = res.data.data;

      if (formik.values.item_id) {return;}

       await  formik.setValues({
        item_id: data.item_id,
        item_name: data.item_name,
        item_price: data.item_price,
        category_id: data.category_id,
        stock: data.stock,
        description: data.description,
        sku: data.sku,
        rating: data.rating,
        variant: (data.variant ?? []).map((v: { variantValue_id: string; variantProperty_id: string; variant_value: string; property_name: string }) => ({
          ...v,
          item_variantvalue_mapping_id: Math.random().toString(36).substring(2, 11)
        })),
        variant_collections: data.variant_collections ?? [],
        images: data.images ?? [],
      });
    };


  useEffect(() => {
    void dispatch(fetchVariantData());
    void dispatch(fetchCategoriesAll());

    void fetchItem();
  }, [ ]);

  if (item_id && loading) {
    return (
       <LoadingProduct />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-slate-200 max-w-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            We couldn&apos;t find the product you&apos;re looking for.
          </p>
          <Button onClick={handleOnClose}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const IsEditMode = (item_id:string | undefined)=>{return item_id ? "Update Product" : "Save Product";}
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <form onSubmit={(e) => {
        
        formik.handleSubmit(e);
      }}>
        <div className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {item_id ? "Edit" : "Add"} Product
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Enter product details, pricing, and variants
              </p>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={handleOnClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting? "Saving...": IsEditMode(item_id)} 
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Section title="General Information" subtitle="Basic product details">
              <ProductsDiscription formik={formik} />
            </Section>

            <Section title="Pricing & Inventory" subtitle="Cost and quantity">
              <ProductsPrice formik={formik} />
            </Section>

            <Section title="Product Variants" subtitle="Size, color, etc.">
              <VarientProduct formik={formik} />
            </Section>

            <Section title="Variant Collections" subtitle="Group related items">
              <VariantCollectionComponent formik={formik} />
            </Section>
          </div>

          <div className="space-y-8">
            <Section title="Product Image" subtitle="Main product image">
              <ProductImage
                images={formik.values.images ?? []}
                onUpload={(file) => void formik.handleImageUpload([file])}
                onRemove={ async  (index) => {
                  const newImages = [...(formik.values.images ?? [])];
                  newImages.splice(index, 1);
                   await formik.setFieldValue("images", newImages);
                }}
              />
            </Section>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2">Pro Tip</h3>
              <p className="text-sm text-blue-700">
                Add variants to improve product discoverability.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


