import { useFormik } from "formik";

import { ItemSchema } from "../schemas/item.schema";
import type { Item, AddItemParams, Variant } from "../types/item.types";
import { useAppDispatch } from "../redux/store";
import { addItem, editItem } from "../redux/features/item-slice";
import { useState } from "react";
import { uploadFiles } from "../services/uploads.service";

interface UseItemFormProps {
    initialData?: Item;
    onClose: () => void;
}

export const useItemForm = ({ initialData, onClose }: UseItemFormProps) => {
    const dispatch = useAppDispatch();

    const formik = useFormik<Item>({
        initialValues: {
            item_id: initialData?.item_id ?? "",
            item_name: initialData?.item_name ?? "",
            item_price: initialData?.item_price ?? 0,
            category_id: initialData?.category_id ?? "",
            stock: initialData?.stock ?? 0,
            description: initialData?.description ?? "",
            sku: initialData?.sku ?? "",
            rating: initialData?.rating ?? 0,
            variant: initialData?.variant ? initialData.variant.map(v => ({ ...v, item_variantvalue_mapping_id: v.item_variantvalue_mapping_id })) : [],
            images: initialData?.images ?? [],
            variant_collections: initialData?.variant_collections ? initialData.variant_collections : [],
            isEdit: false
        },
        enableReinitialize: true,
        validationSchema: ItemSchema,
        onSubmit: async (values, { resetForm }) => {
            const payload: Partial<Item> & Record<string, unknown> = {
                ...values,
                item_price: typeof values.item_price === 'number' ? values.item_price : 0,
                stock: typeof values.stock === 'number' ? values.stock : 0,
                rating: values.rating ? (typeof values.rating === 'number' ? values.rating : 0) : undefined,
                images: values.images,
                variant: values.variant && values.variant.length > 0 ? values.variant : undefined,
            };

            if ('isEdit' in payload) delete payload.isEdit;
            if (payload.variant) {
                payload.variant = payload.variant.map((v: Variant) => {
                    const { item_variantvalue_mapping_id: _, ...rest } = v;
                    return rest;
                });
            }

            if (values.item_id) {
                await dispatch(editItem(payload as Partial<Item>));
            } else {
                await dispatch(addItem(payload as AddItemParams));
            }
            resetForm();
            onClose();
        },

    });

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (files: File[]) => {
        try {
            setUploading(true);
            const response = await uploadFiles(files, 'item');
            if (response && Array.isArray(response.data)) {
                const urls = response.data.map((file: { url: string|undefined }) => file.url);
                const currentImages = formik.values.images ?? [];
                void formik.setFieldValue('images', [...currentImages, ...urls]);

            }
        } catch (error) {
            console.error(error);

        } finally {
            setUploading(false);
        }
    };

    return { ...formik, handleImageUpload, uploading };
};
