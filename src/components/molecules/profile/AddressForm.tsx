"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface AddressFormProps {
  onClose: () => void;
  onSave: (address: any) => void;
}

export default function AddressForm({ onClose, onSave }: AddressFormProps) {
  const [formData, setFormData] = useState({
    id: Date.now().toString(),
    label: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          name="label"
          placeholder="Home, Work"
          value={formData.label}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          name="street"
          placeholder="123 Main St"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isDefault"
          name="isDefault"
          checked={formData.isDefault}
          onCheckedChange={(checked) => setFormData((p) => ({ ...p, isDefault: checked as boolean }))}
        />
        <Label htmlFor="isDefault" className="cursor-pointer">Set as default</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">Save</Button>
        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
}
