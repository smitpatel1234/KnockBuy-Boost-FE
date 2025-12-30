"use client";

import React from "react";

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
  address: Address;
  checked: boolean;
  onSelect: (id: string) => void;
}

export default function AddressItem({ address, checked, onSelect }: Props) {
  return (
    <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:shadow-sm">
      <input
        type="radio"
        name="selectedAddress"
        checked={checked}
        onChange={() => onSelect(address.id)}
        className="mt-1 h-4 w-4"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          {address.isDefault && <div className="text-xs text-green-600">Default</div>}
        </div>
        <div className="text-sm text-gray-700">{address.street}</div>
        <div className="text-sm text-gray-600">{address.city}, {address.state} {address.postalCode}</div>
        <div className="text-sm text-gray-600">{address.country}</div>
      </div>
    </label>
  );
}
