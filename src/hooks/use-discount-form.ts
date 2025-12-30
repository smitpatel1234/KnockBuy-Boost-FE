import { useFormik } from "formik";
import * as Yup from "yup";
import { Discount, AddDiscountParams } from "../types/discount.type";
import { useAppDispatch } from "../redux/store";
import { addDiscount, editDiscount } from "../redux/features/discount-slice";

interface UseDiscountFormProps {
  initialData?: Discount | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const useDiscountForm = ({
  initialData,
  onClose,
  onSuccess,
}: UseDiscountFormProps) => {
  const dispatch = useAppDispatch();

  const formik = useFormik<Partial<Discount>>({
    enableReinitialize: true,
    initialValues: {
      discount_id: initialData?.discount_id || undefined,
      discount_name: initialData?.discount_name || "",
      discount_code: initialData?.discount_code || "",
      discount_type: initialData?.discount_type || "percentage",
      discount_amount: initialData?.discount_amount || 0,
      duration: initialData?.duration || 0,
      description: initialData?.description || "",
      discount_start_date: initialData?.discount_start_date || undefined,
      active_flag: initialData?.active_flag ?? 1,
    },
    validationSchema: Yup.object({
      discount_name: Yup.string().required("Discount name is required"),
      discount_code: Yup.string().required("Discount code is required"),
      discount_type: Yup.string()
        .oneOf(["percentage", "flat"])
        .required("Discount type is required"),
      discount_amount: Yup.number()
        .typeError("Amount must be a number")
        .min(0, "Amount must be positive")
        .when("discount_type", {
          is: "percentage",
          then: (schema) =>
            schema.max(100, "Percentage cannot exceed 100").required(),
          otherwise: (schema) => schema.required(),
        }),
      duration: Yup.number().optional(),
      description: Yup.string().optional(),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (values.discount_id) {
          await dispatch(editDiscount(values as Discount)).unwrap();
        } else {
          const { discount_id, ...createData } = values;
          await dispatch(addDiscount(createData as AddDiscountParams)).unwrap();
        }
        onSuccess();
        resetForm();
        onClose();
      } catch (error) {
        console.error("Failed to save discount", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
