"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { PlusIcon, MapPinIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Address, AddAddress } from "@/types/address.type";
import {
  getAllAddressByUserId,
  createAddress,
  updateAddress as updateAddressService,
  deleteAddress
} from "@/services/address.service";
import AddressForm from "@/components/molecules/AddressForm";
import { Card, CardContent } from "@/components/atoms/Card";

export default function UserAddress() {
  const { user_id } = useParams();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async () => {
    if (!user_id) return;
    setLoading(true);
    try {
      const response = await getAllAddressByUserId(user_id as string);
      setAddresses(response.data.data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user_id]);

  const handleCreate = async (values: Address | AddAddress) => {
    try {
      await createAddress(values as AddAddress);
      setIsAdding(false);
      fetchAddresses();
    } catch (error) {
      console.error("Failed to create address", error);
    }
  };

  const handleUpdate = async (values: Address | AddAddress) => {
    try {
      await updateAddressService(values as Address);
      setEditingAddress(null);
      fetchAddresses();
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };

  const handleDelete = async (addressId: string) => {
    try {
      await deleteAddress(addressId);
      fetchAddresses();
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-800">Saved Addresses</h3>
        </div>

        {!isAdding && !editingAddress && (
          <Button
            variant="default"
            size="sm"
            className="gap-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            onClick={() => setIsAdding(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Add New Address
          </Button>
        )}
      </div>

      {/* Forms */}
      {isAdding && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <AddressForm
            onCancel={() => setIsAdding(false)}
            onSubmit={handleCreate}
          />
        </div>
      )}

      {editingAddress && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <AddressForm
            initialValues={editingAddress}
            onCancel={() => setEditingAddress(null)}
            onSubmit={handleUpdate}
          />
        </div>
      )}

      {/* Address Items */}
      <div className="grid grid-cols-1 gap-4">
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <Card key={addr.address_id} className="hover:border-blue-200 transition-colors shadow-none border-slate-200 bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">{addr.address_line1}</p>
                    {addr.address_line2 && <p className="text-sm text-slate-500">{addr.address_line2}</p>}
                    <p className="text-sm text-slate-600">
                      {addr.city}, {addr.state}, {addr.country} - <span className="font-mono font-bold text-slate-900">{addr.pincode}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold uppercase tracking-wider hover:bg-blue-50 hover:text-blue-600 transition-all"
                      onClick={() => setEditingAddress(addr)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-all shadow-sm"
                      onClick={() => handleDelete(addr.address_id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : !loading && !isAdding && (
          <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <MapPinIcon className="w-12 h-12 text-slate-200 mb-2" />
            <p className="text-sm font-medium text-slate-400">No addresses saved yet.</p>
          </div>
        )}
        {loading && <div className="text-center py-4 text-slate-400 animate-pulse font-medium">Loading addresses...</div>}
      </div>
    </div>
  );
}
