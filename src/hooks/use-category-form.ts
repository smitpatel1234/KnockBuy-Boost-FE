import { useFormik } from "formik";
import * as Yup from "yup";
import { AddCategoryParams, Category } from "../types/category.type";
import { useAppDispatch } from "../redux/store";
import { addCategory, editCategory } from "../redux/features/category-slice";
import { useState } from "react";
import { uploadFiles } from "../services/uploads.service";

interface UseCategoryFormProps {
    initialData?: Category;
    onClose: () => void;
}

export const useCategoryForm = ({ initialData, onClose }: UseCategoryFormProps) => {
    const dispatch = useAppDispatch();

    const isEdit = !!initialData;

    const formik = useFormik({
        initialValues: {
            category_name: initialData?.category_name || "",
            description: initialData?.description || "",
            image_url: initialData?.image_url || "",
            parent_category_id: initialData?.parent_category_id || "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            category_name: Yup.string().required("Category name is required"),
            description: Yup.string(),
            image_url: Yup.string().url("Must be a valid URL"),
            parent_category_id: Yup.string().nullable(),
        }),
        onSubmit: async (values) => {
            const payload: AddCategoryParams = {
                category_name: values.category_name,
                description: values.description,
                image_url: values.image_url,
                parent_category_id: values.parent_category_id || undefined,
            };

            if (isEdit && initialData) {
                await dispatch(editCategory({ ...payload, category_id: initialData.category_id }));
            } else {
                await dispatch(addCategory(payload));
            }
            onClose();
        },
    });
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (file: File) => {
        try {
            setUploading(true);
            const url = await uploadFiles([file], 'category');
            
            if (url && url.data && url.data.url) {
                formik.setFieldValue('image_url', url.data.url);
            } 

        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return { formik, handleImageUpload, uploading };
};
