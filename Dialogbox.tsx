"use client";
import { GenericDialog } from "@/components/molecules/GenericDialogProps";
import { useState } from "react";
import { categoryFormSchema } from "@/data/categoryInitial";
import { categoryType } from "@/types/category.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/atoms/Button";
import { DeleteIcon, EditIcon,PlusIcon } from "lucide-react";

export default function Dialogbox({ category,purpose }: { category: categoryType,purpose:string }) {
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => setOpen(false);

  return (
    <GenericDialog<categoryType>
      open={open}
      title="Dialog title"
      description="Dialog description"
      data={category}
      onClose={handleClose}
    >
      {(data) => {
        return (
          <div className="flex flex-row">
            {categoryFormSchema.map((components) => {
              if (components.type === "text") {
                return (
                  <Input
                    placeholder="categoryname"
                    value={data?.categoryname}
                  />
                );
              }
              if (components.key === "edit") {
                return <Button size="icon" variant="outline" className="w-9 h-9 ml-1  md-1">
              {purpose.includes("edit") ? <EditIcon className="w-4 h-4" />  :<PlusIcon className="w-4 h-4" />} 
              </Button>;
              }
              if (components.key === "delete") {
                return <Button size="icon" variant="destructive" className="w-9 h-9 ml-1  md-1 ">
                <DeleteIcon className="w-4 h-4" />
              </Button> ;
              }
            })}
          </div>
        );
      }}
    </GenericDialog>
  );
}
