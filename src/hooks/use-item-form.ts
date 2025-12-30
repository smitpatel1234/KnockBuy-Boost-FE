import { useFormik } from "formik";
import * as Yup from "yup";
import { Item, AddItemParams } from "../types/item.type";
import { useAppDispatch } from "../redux/store";
import { addItem, editItem } from "../redux/features/item-slice";
import { useState } from "react";
import { uploadFiles } from "../services/uploads.service";
import { toast } from "sonner";

interface UseItemFormProps {
    initialData?: Item;
    onClose: () => void;
}

export const useItemForm = ({ initialData, onClose }: UseItemFormProps) => {
    const dispatch = useAppDispatch();

    const formik = useFormik<Item>({
        initialValues: {
            item_id: initialData?.item_id || "",
            item_name: initialData?.item_name || "",
            item_price: initialData?.item_price || 0,
            category_id: initialData?.category_id || "",
            stock: initialData?.stock || 0,
            description: initialData?.description || "",
            sku: initialData?.sku || "",
            rating: initialData?.rating || 0,
            variant: initialData?.variant?.map(v => ({ ...v, item_variantvalue_mapping_id: v.item_variantvalue_mapping_id })) || [],
            images: initialData?.images || [],
            isEdit: false
        },
        validationSchema: Yup.object({
            item_name: Yup.string().required("Item name is required"),
            item_price: Yup.number().min(0).required("Price is required"),
            category_id: Yup.string().required("Category is required"),
            stock: Yup.number().min(0).required("Stock is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const payload: Partial<Item> & Record<string, unknown> = {
                ...values,
                item_price: +values.item_price,
                stock: +values.stock,
                rating: values.rating ? +values.rating : undefined,
                images: values.images,
                variant: values.variant && values.variant.length > 0 ? values.variant : undefined,
            };

            if ('isEdit' in payload) delete payload.isEdit;
            if (payload.variant) {
                payload.variant = payload.variant.map((v: any) => {
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
            await onClose();
        },

    });

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (files: File[]) => {
        try {
            setUploading(true);
            const urls = await uploadFiles(files, 'item');
            const currentImages = formik.values.images || [];
            formik.setFieldValue('images', [...currentImages, ...urls]);
            toast.success("Images uploaded successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload images");
        } finally {
            setUploading(false);
        }
    };

    return { ...formik, handleImageUpload, uploading };
};
