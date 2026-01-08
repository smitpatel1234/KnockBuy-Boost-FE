"use client";

import { GenericDialog } from "@/components/molecules/GenericDialogProps";

import type { Category } from "@/types/category.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/atoms/Button";
import { ImagePreview } from "@/components/molecules/ImagePreview";
import { ImageUploadButton } from "@/components/molecules/ImageUploadButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategoryForm } from "@/hooks/useCategoryForm";
import { useAppSelector } from "@/redux/store"; // To get parents list

interface DialogboxProps {
  category?: Category; // Undefined for "Add Mode"
  isOpen: boolean;
  onClose: () => void;
}

export default function Dialogbox({
  category,
  isOpen,
  onClose,
}: DialogboxProps) {
  const formik = useCategoryForm({ initialData: category, onClose });
  const { categories } = useAppSelector((state) => state.category);
  const potentialParents = categories.filter(
    (c) => c.category_id !== category?.category_id
  );

  return (
    <GenericDialog
      open={isOpen}
      title={category ? "Edit Category" : "Add New Category"}
      description={
        category ? "Update category details" : "Create a new product category"
      }
      data={category}
      onClose={onClose}
    >
      {() => (
        <>

          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
              <div className="flex flex-col gap-4">
                <ImagePreview src={formik.values.image_url} />
                <ImageUploadButton onImageSelect={formik.handleImageUpload} />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Parent Category
                  </label>
                  <Select
                    value={formik.values.parent_category_id}
                    onValueChange={(val) => {
                      void formik.setFieldValue("parent_category_id", val);
                    }}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select parent (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Existing Categories</SelectLabel>
                        <SelectItem value="root_none">None (Root)</SelectItem>
                        {potentialParents.map((c) => (
                          <SelectItem key={c.category_id} value={c.category_id}>
                            {c.category_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Category Name
                  </label>
                  <Input
                    placeholder="Category name"
                    name="category_name"
                    value={formik.values.category_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.category_name &&
                    formik.errors.category_name && (
                      <span className="text-xs text-red-500">
                        {formik.errors.category_name}
                      </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Description
                  </label>
                  <Textarea
                    placeholder="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="flex gap-2 justify-end mt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" debounceMs={400}>
                    {category ? "Update" : "Create"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </>
      )
      }
    </GenericDialog >
  );
}
