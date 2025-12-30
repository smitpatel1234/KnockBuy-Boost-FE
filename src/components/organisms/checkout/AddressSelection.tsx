"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import AddressItem from "@/components/molecules/profile/AddressItem";
import AddressForm from "@/components/molecules/profile/AddressForm";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

interface Props {
  onSelect?: (address: Address | null) => void;
}

export default function AddressSelection({ onSelect }: Props) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      street: "221B Baker Street",
      city: "London",
      state: "Greater London",
      postalCode: "NW1 6XE",
      country: "UK",
      isDefault: true,
    },
    {
      id: "2",
      street: "350 Fifth Avenue",
      city: "New York",
      state: "NY",
      postalCode: "10118",
      country: "USA",
      isDefault: false,
    },
  ]);

  const defaultSelected = addresses.find((a) => a.isDefault)?.id || (addresses[0] && addresses[0].id) || null;
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelected);
  const [showForm, setShowForm] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const found = addresses.find((a) => a.id === id) || null;
    onSelect && onSelect(found);
  };

  const handleSave = (address: Address) => {
    setAddresses((prev) => {
      const next = address.isDefault ? prev.map((p) => ({ ...p, isDefault: false })) : prev;
      return [...next, address];
    });
    setSelectedId(address.id);
    onSelect && onSelect(address);
  };

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Select shipping address</h3>
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowForm((s) => !s)}>
          <PlusIcon className="h-4 w-4" />
          Add
        </Button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-3 bg-gray-50">
          <AddressForm onClose={() => setShowForm(false)} onSave={handleSave} />
        </div>
      )}

      <div className="space-y-2">
        {addresses.map((addr) => (
          <AddressItem key={addr.id} address={addr} checked={selectedId === addr.id} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
