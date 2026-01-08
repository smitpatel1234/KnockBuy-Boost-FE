import * as Yup from "yup";

export const ItemSchema = Yup.object({
    item_name: Yup.string().required("Item name is required"),
    item_price: Yup.number().min(0).required("Price is required"),
    category_id: Yup.string().required("Category is required"),
    stock: Yup.number().min(0).required("Stock is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.array().of(Yup.string()),
    variant: Yup.array(),
    variant_collections: Yup.array(),
});
