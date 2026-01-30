"use client";

import { GenericDialog } from "@/components/molecules/GenericDialogProps";
import { useState ,useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/atoms/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { editVariantValue } from "@/redux/features/variant-slice";
import type { VariantProperty } from "@/types/variant.types";

interface EditVariantValueDialogProps {
    isOpen: boolean;
    variantValue: { variantValue_id: string; variant_value?: string; variantProperty_id?: string } | null;
    onClose: () => void;
}

export default function EditVariantValueDialog({
    isOpen,
    variantValue,
    onClose,
}: EditVariantValueDialogProps) {
    const dispatch = useAppDispatch();
    const { properties } = useAppSelector((state) => state.variant);
    const [loading, setLoading] = useState(false);

    const [selectedPropId, setSelectedPropId] = useState("");
    const [valueName, setValueName] = useState("");

    useEffect(() => {
        if (variantValue) {
            setSelectedPropId(variantValue.variantProperty_id ?? "");
            setValueName(variantValue.variant_value ?? "");
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!selectedPropId || !valueName.trim() || !variantValue) return;

        setLoading(true);
        try {
            await dispatch(editVariantValue({
                variantValue_id: variantValue.variantValue_id,
                variant_value: valueName,
                variantProperty_id: selectedPropId
            })).unwrap();
            onClose();
        } catch (error) {
            console.error("Failed to update variant value", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GenericDialog
            open={isOpen}
            title="Edit Variant Value"
            description="Update variant value details"
            onClose={onClose}
        >
            {() => (
                <div className="flex flex-col gap-6 p-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-muted-foreground">
                            Property
                        </label>
                        <Select value={selectedPropId} onValueChange={setSelectedPropId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a property" />
                            </SelectTrigger>
                            <SelectContent>
                                {properties.map((p: VariantProperty) => (
                                    <SelectItem key={p.variantProperty_id} value={p.variantProperty_id}>
                                        {p.property_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-muted-foreground">
                            Value Name
                        </label>
                        <Input
                            placeholder="e.g. Red, XL, Cotton"
                            value={valueName}
                            onChange={(e) => { setValueName(e.target.value); }}
                        />
                    </div>


                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={onClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button onClick={() => void handleSubmit()} disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            )}
        </GenericDialog>
    );
}
