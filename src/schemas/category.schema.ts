import * as Yup from "yup";

export const CategorySchema = Yup.object({
    category_name: Yup.string().required("Category name is required"),
    description: Yup.string(),
    image_url: Yup.string(),
    parent_category_id: Yup.string().nullable(),
});
