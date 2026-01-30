import type { FormikProps } from "formik/dist/types";
import type { Item } from "./item.types";

export interface VariantProperty {
    variantProperty_id: string;
    property_name: string;
}

export interface VariantValue {
    variantValue_id: string;
    variant_value: string;
    variantProperty_id: string;
}

export interface VariantDataResponse {
    properties: VariantProperty[];
    values: VariantValue[];
}
export interface VariantState {
    properties: VariantProperty[];
    values: VariantValue[];
    loading: boolean;
    error: string | null;
}

export const initialState: VariantState = {
    properties: [],
    values: [],
    loading: false,
    error: null,
};
export interface VarientProductProps {
  formik: FormikProps<Item>;
}