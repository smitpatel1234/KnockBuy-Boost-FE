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
