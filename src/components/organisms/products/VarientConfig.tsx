"use client";
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/atoms/Button'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addVariantProperty, addVariantValue, removeVariantProperty } from '@/redux/features/variant-slice';
import type { VariantProperty } from '@/types/variant.types';

export default function VarientConfig() {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.variant);

  const [newPropertyName, setNewPropertyName] = useState("");
  const [selectedPropId, setSelectedPropId] = useState<string>("");
  const [newValueName, setNewValueName] = useState("");

  const handleAddProperty = () => {
    if (newPropertyName.trim()) {
      void dispatch(addVariantProperty({ property_name: newPropertyName }));
      setNewPropertyName("");
    }
  };

  const handleAddValue = () => {
    if (selectedPropId && newValueName.trim()) {
      void dispatch(addVariantValue({
        variant_value: newValueName,
        variantProperty_id: selectedPropId
      }));
      setNewValueName("");
    }
  };

  const handleDeleteProperty = () => {
    if (selectedPropId) {
      void dispatch(removeVariantProperty(selectedPropId));
      setSelectedPropId("");
    }
  }

  return (
    <div className="space-y-8">
      {/* 1. Add Property */}
      <div className="space-y-4 p-4 border rounded-lg bg-slate-50/50">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Add New Property</h3>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Label className="text-xs text-gray-500 mb-1.5 block">Property Name (e.g. Size, Color, Fabric)</Label>
            <Input
              value={newPropertyName}
              onChange={(e) => { setNewPropertyName(e.target.value); }}
              placeholder="Enter property name..."
              className="bg-white"
            />
          </div>
          <Button onClick={handleAddProperty} className="bg-blue-600 hover:bg-blue-700 h-10 px-6">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* 2. Add Values for Property */}
      <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Add Values for Property</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-500 mb-1.5 block">Select Property</Label>
            <div className="flex gap-2">
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
              {selectedPropId && (
                <Button variant="ghost" size="icon" onClick={handleDeleteProperty} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-gray-500 mb-1.5 block">New Value (e.g. XL, Red, Cotton)</Label>
            <div className="flex gap-2">
              <Input
                value={newValueName}
                onChange={(e) => { setNewValueName(e.target.value); }}
                placeholder="Enter value..."
                disabled={!selectedPropId}
              />
              <Button
                onClick={handleAddValue}
                disabled={!selectedPropId || !newValueName.trim()}
                variant="secondary"
                className="px-6"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Value
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
