import { Input } from "@/components/ui/input";
import { Button } from "@/components/atoms/Button";
import type { JSX } from "react/jsx-dev-runtime";
import type { Discount } from "@/types/discount.types";
import type { FormikProps } from "formik";

export default function DiscountCode(formik: FormikProps<Discount> ,renderError: (field: keyof typeof formik.values) => JSX.Element | null) {
      const generateCode = () => {
    const code =
      "DSC" + Math.random().toString(36).substring(2, 8).toUpperCase();
    void formik.setFieldValue("discount_code", code);
    void formik.setFieldTouched("discount_code", true);
  };

  return (
             <div className="flex flex-col gap-1">
            <label htmlFor="discount_code" className="text-sm font-medium text-muted-foreground">
              Discount Code
            </label>
            <div className="flex gap-2">
              <Input
                name="discount_code"
                placeholder="DISCOUNT10"
                value={formik.values.discount_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateCode}
              >
                Generate
              </Button>
            </div>
            {renderError("discount_code")}
          </div>
  )
}
