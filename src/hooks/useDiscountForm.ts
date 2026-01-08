import { useFormik } from "formik";
import { DiscountSchema } from "../schemas/discount.schema";
import type { Discount, AddDiscountParams } from "../types/discount.types";
import { useAppDispatch } from "../redux/store";
import { addDiscount, editDiscount } from "../redux/features/discount-slice";
import { formatDateForInput } from "../utils/dateFormatter";

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
      discount_id: initialData?.discount_id ?? undefined,
      discount_name: initialData?.discount_name ?? "",
      discount_code: initialData?.discount_code ?? "",
      discount_type: initialData?.discount_type ?? "percentage",
      discount_amount: initialData?.discount_amount ?? 0,
      duration: initialData?.duration ?? 0,
      description: initialData?.description ?? "",
      discount_start_date: formatDateForInput(initialData?.discount_start_date) || undefined,
      active_flag: initialData?.active_flag ?? 1,
    },
    validationSchema: DiscountSchema,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (values.discount_id) {
          await dispatch(editDiscount(values as Discount)).unwrap();
        } else {
          const { discount_id: _, ...createData } = values;
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
