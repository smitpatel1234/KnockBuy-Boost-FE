"use client";

import { GenericDialog } from "@/components/molecules/GenericDialogProps";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/atoms/Button";
import { Textarea } from "@/components/ui/textarea";
import DateInputComponent from "@/components/atoms/DateInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Discount } from "@/types/discount.type";
import { useDiscountForm } from "@/hooks/use-discount-form";
interface DialogboxProps {
  isOpen: boolean;
  item?: Discount | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function Dialogbox({
  isOpen,
  item,
  onClose,
  onSuccess,
}: DialogboxProps) {
  const formik = useDiscountForm({
    initialData: item,
    onClose,
    onSuccess,
  });
  const generateCode = () => {
    const code =
      "DSC" + Math.random().toString(36).substring(2, 8).toUpperCase();
    formik.setFieldValue("discount_code", code);
  };

  return (
    <GenericDialog
      open={isOpen}
      title={item ? "Edit Discount" : "Add Discount"}
      description={item ? "Update discount details" : "Create a new discount"}
      onClose={onClose}
    >
      {() => (
        <div className="flex flex-col gap-6 p-2">
          {/* Discount Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Discount Name
            </label>
            <Input
              name="active_flag"
              type="checkbox"
              checked={!!formik.values.active_flag}
              onChange={(e) => {
                if (e.target.checked) {
                  formik.setFieldValue("active_flag", 1);
                } else {
                  formik.setFieldValue("active_flag", 0);
                }
              }}
              onBlur={formik.handleBlur}
            />

            <Input
              placeholder="Discount name"
              name="discount_name"
              value={formik.values.discount_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.discount_name && formik.errors.discount_name && (
              <div className="text-red-500 text-xs">
                {formik.errors.discount_name}
              </div>
            )}
          </div>

          {/* Discount Code */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Discount Code
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="DISCOUNT10"
                className="flex-1"
                name="discount_code"
                value={formik.values.discount_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Button
                type="button"
                variant="outline"
                className="whitespace-nowrap"
                onClick={generateCode}
              >
                Generate
              </Button>
            </div>
            {formik.touched.discount_code && formik.errors.discount_code && (
              <div className="text-red-500 text-xs">
                {formik.errors.discount_code}
              </div>
            )}
          </div>

          {/* Discount Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Discount Type
            </label>
            <Select
              value={formik.values.discount_type}
              onValueChange={(val) =>
                formik.setFieldValue("discount_type", val)
              }
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="flat">Flat Amount</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.discount_type && formik.errors.discount_type && (
              <div className="text-red-500 text-xs">
                {formik.errors.discount_type}
              </div>
            )}
          </div>

          {/* Discount Value */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Discount Value
            </label>
            <Input
              type="number"
              placeholder="e.g. 10 or 500"
              name="discount_amount"
              value={formik.values.discount_amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.discount_amount &&
              formik.errors.discount_amount && (
                <div className="text-red-500 text-xs">
                  {formik.errors.discount_amount}
                </div>
              )}
          </div>

          {/* Offer Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Offer Start Date
            </label>
            <DateInputComponent
              placeholder="Select offer start date"
              value={formik.values.discount_start_date}
              onChange={(date) =>
                formik.setFieldValue("discount_start_date", date)
              }
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Duration
            </label>
            <Input
              type="number"
              placeholder="e.g. 30 days"
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Description
            </label>
            <Textarea
              placeholder="Discount description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-xs">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={() => formik.handleSubmit()}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}
    </GenericDialog>
  );
}
