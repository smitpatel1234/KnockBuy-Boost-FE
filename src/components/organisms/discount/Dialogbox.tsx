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
import type { Discount } from "@/types/discount.types";
import { useDiscountForm } from "@/hooks/useDiscountForm";
import { Checkbox } from "@/components/ui/checkbox";

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
    void formik.setFieldValue("discount_code", code);
    void formik.setFieldTouched("discount_code", true);
  };

  const renderError = (field: keyof typeof formik.values) =>
    formik.touched[field] && formik.errors[field] ? (
      <p className="text-xs text-red-500">{formik.errors[field]}</p>
    ) : null;

  return (
    <GenericDialog
      open={isOpen}
      title={item ? "Edit Discount" : "Add Discount"}
      description={item ? "Update discount details" : "Create a new discount"}
      onClose={onClose}
    >
      {() => (
        <form
          onSubmit={(e) => { formik.handleSubmit(e); }}
          className="flex flex-col gap-6 p-2"
        >
          {/* Active Flag */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="active_flag"
              checked={!!formik.values.active_flag}
              onCheckedChange={(checked) => {
                void formik.setFieldValue("active_flag", checked ? 1 : 0);
              }}
            />
            <label
              htmlFor="active_flag"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Active
            </label>
          </div>

          {/* Discount Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Discount Name
            </label>
            <Input
              name="discount_name"
              placeholder="Discount name"
              value={formik.values.discount_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderError("discount_name")}
          </div>

          {/* Discount Code */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
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

          {/* Discount Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Discount Type
            </label>
            <Select
              value={formik.values.discount_type}
              onValueChange={(value) => {
                void formik.setFieldValue("discount_type", value);
                void formik.setFieldTouched("discount_type", true);
              }}
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
            {renderError("discount_type")}
          </div>

          {/* Discount Amount */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Discount Value
            </label>
            <Input
              type="number"
              name="discount_amount"
              placeholder="e.g. 10 or 500"
              value={formik.values.discount_amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderError("discount_amount")}
          </div>

          {/* Offer Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Offer Start Date
            </label>
            <DateInputComponent
            className=""
              placeholder="Select offer start date"
              value={formik.values.discount_start_date}
              onChange={(date) => {
                void formik.setFieldValue("discount_start_date", date);
                void formik.setFieldTouched("discount_start_date", true);
              }}
            />
            {renderError("discount_start_date")}
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Duration (days)
            </label>
            <Input
              type="number"
              name="duration"
              placeholder="e.g. 30"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderError("duration")}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Description
            </label>
            <Textarea
              name="description"
              placeholder="Discount description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderError("description")}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      )}
    </GenericDialog>
  );
}
