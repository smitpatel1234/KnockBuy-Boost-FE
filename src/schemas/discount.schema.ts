import * as Yup from "yup";

export const DiscountSchema = Yup.object({
    discount_name: Yup.string()
        .trim()
        .min(3, "Discount name must be at least 3 characters")
        .max(100, "Discount name cannot exceed 100 characters")
        .required("Discount name is required"),

    discount_code: Yup.string()
        .trim()
        .uppercase()
        .matches(
            /^[A-Z0-9_-]+$/,
            "Code can contain only uppercase letters, numbers, _ and -"
        )
        .min(4, "Discount code must be at least 4 characters")
        .max(20, "Discount code cannot exceed 20 characters")
        .required("Discount code is required"),

    discount_type: Yup.string()
        .oneOf(["percentage", "flat"], "Invalid discount type")
        .required("Discount type is required"),

    discount_amount: Yup.number()
        .typeError("Discount amount must be a number")
        .when("discount_type", {
            is: "percentage",
            then: (schema) =>
                schema
                    .integer("Percentage must be a whole number")
                    .min(1, "Percentage must be at least 1")
                    .max(100, "Percentage cannot exceed 100")
                    .required("Percentage is required"),
            otherwise: (schema) =>
                schema
                    .min(1, "Flat discount must be greater than 0")
                    .max(100000, "Discount amount is too large")
                    .required("Flat discount amount is required"),
        }),

    duration: Yup.number()
        .typeError("Duration must be a number")
        .integer("Duration must be an integer")
        .min(1, "Duration must be at least 1 day")
        .max(365, "Duration cannot exceed 365 days")
        .optional(),

    description: Yup.string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
});
