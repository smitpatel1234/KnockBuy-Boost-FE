import * as Yup from "yup";

export const AddressSchema = Yup.object({
    address_line1: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    pincode: Yup.number().required("Required").positive().integer(),
});
