"use client";

import React, { useState } from "react";
import { Input } from "../../atoms/Input";
import { Textarea } from "../../atoms/Textarea";
import { Button } from "../../atoms/Button";
import { Plus, Trash2 } from "lucide-react";
import type { ItemDescriptionFormProps, KeyFeatureItem } from "@/types/item.types";
import { useMemo } from "react";
export default function ItemDescriptionForm({ formik }: Readonly<ItemDescriptionFormProps>) {
    const { values, setFieldValue } = formik;
    const richDesc = (values.rich_description) ?? {
        how_its_made: "",
        how_to_use: "",
        key_features: {},
        specifications: []
    };

    // Local state for key features as array for stable rendering
    const initialFeatures = useMemo<KeyFeatureItem[]>(() => {
        const featuresObj = richDesc.key_features ?? ({} as Record<string, string>);

        return Object.entries(featuresObj).map(([key, value], index) => ({
            id: `feature-${String(index)}-${key}`,
            key,
            value
        }));
    }, [richDesc.key_features]);


    const [localFeatures, setLocalFeatures] = useState<KeyFeatureItem[]>(initialFeatures);

    // Sync local features to formik
    const syncFeaturesToFormik = (features: KeyFeatureItem[]) => {
        const featuresObj = Object.fromEntries(
            features.map(f => [f.key, f.value])
        );
        void setFieldValue("rich_description.key_features", featuresObj);
    };

    const addSpecification = () => {
        const specs = [...(richDesc.specifications ?? [])];
        specs.push("");
        void setFieldValue("rich_description.specifications", specs);
    };

    const removeSpecification = (index: number) => {
        const specs = [...(richDesc.specifications ?? [])];
        specs.splice(index, 1);
        void setFieldValue("rich_description.specifications", specs);
    };

    const updateSpecification = (index: number, value: string) => {
        const specs = [...(richDesc.specifications ?? [])];
        specs[index] = value; void setFieldValue("rich_description.specifications", specs);
    };

    const addKeyFeature = () => {
        const newId = `feature-${String(Date.now())}`;
        const newFeatures = [...localFeatures, { id: newId, key: `New Feature ${String(localFeatures.length + 1)}`, value: "" }];
        setLocalFeatures(newFeatures);
        syncFeaturesToFormik(newFeatures);
    };

    const removeKeyFeature = (id: string) => {
        const newFeatures = localFeatures.filter(f => f.id !== id);
        setLocalFeatures(newFeatures);
        syncFeaturesToFormik(newFeatures);
    };

    const updateKeyFeatureKey = (id: string, newKey: string) => {
        const newFeatures = localFeatures.map(f =>
            f.id === id ? { ...f, key: newKey } : f
        );
        setLocalFeatures(newFeatures);
    };

    const updateKeyFeatureValue = (id: string, newValue: string) => {
        const newFeatures = localFeatures.map(f => f.id === id ? { ...f, value: newValue } : f);
        setLocalFeatures(newFeatures);
    };

    const handleFeatureBlur = () => { syncFeaturesToFormik(localFeatures); };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">How It&apos;s Made</label>
                    <Textarea
                        placeholder="Describe the manufacturing process..."
                        value={richDesc.how_its_made ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { void setFieldValue("rich_description.how_its_made", e.target.value); }}
                        className="min-h-[100px]" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">How to Use</label>
                    <Textarea
                        placeholder="Provide usage instructions..."
                        value={richDesc.how_to_use ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { void setFieldValue("rich_description.how_to_use", e.target.value); }}
                        className="min-h-[100px]" />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-slate-700">Key Features</label>
                    <Button type="button" variant="outline" size="sm" onClick={() => { addKeyFeature(); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add Feature
                    </Button>
                </div>
                <div className="space-y-3">
                    {localFeatures.map((feature) => (
                        <div key={feature.id} className="flex gap-3 items-start">
                            <Input
                                placeholder="Feature Name"
                                value={feature.key}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { updateKeyFeatureKey(feature.id, e.target.value); }}
                                onBlur={handleFeatureBlur}
                                className="w-1/3" />
                            <Input
                                placeholder="Feature Value"
                                value={feature.value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { updateKeyFeatureValue(feature.id, e.target.value); }}
                                onBlur={handleFeatureBlur}
                                className="flex-1" />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="text-red-500 hover:text-red-600 border-red-100 hover:border-red-200"
                                onClick={() => { removeKeyFeature(feature.id); }}
                            ><Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-slate-700">Specifications</label>
                    <Button type="button" variant="outline" size="sm" onClick={() => { addSpecification(); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add Spec
                    </Button>
                </div>
                <div className="space-y-3">
                    {(richDesc.specifications ?? []).map((spec, index) => (
                        <div key={index} className="flex gap-3">
                            <Input
                                placeholder="e.g. Weight: 1.2kg"
                                value={spec}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { updateSpecification(index, e.target.value); }}
                                className="flex-1" />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="text-red-500 hover:text-red-600 border-red-100 hover:border-red-200"
                                onClick={() => { removeSpecification(index); }}>
                                <Trash2 className="w-4 h-4" /></Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
