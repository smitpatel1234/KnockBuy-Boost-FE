import { useState, useEffect } from "react";
import {
  getAllAddressByUserId,
  createAddress,
} from "@/services/address.service";
import {
  updateAddress as updateAddressService,
  deleteAddress,
} from "@/services/address.service";
import type { Address, AddAddress } from "@/types/address.types";
export const useAddress = (onSelect: (address: Address) => void) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await getAllAddressByUserId();
      setAddresses(response.data.data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAddresses();
  }, []);

  const handleCreate = async (values: Address | AddAddress) => {
    try {
      await createAddress(values as AddAddress);
      setIsAdding(false);
      void fetchAddresses();
    } catch (error) {
      console.error("Failed to create address", error);
    }
  };

  const handleUpdate = async (values: Address | AddAddress) => {
    try {
      await updateAddressService(values as Address);
      setEditingAddress(null);
      void fetchAddresses();
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };

  const handleDelete = async (addressId: string) => {
    try {
      await deleteAddress(addressId);
      void fetchAddresses();
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  const onAddressChangeHandle = (addressId: string) => {
    setSelected(addressId);
    const selectedAddress = addresses.find(
      (addr) => addr.address_id === addressId
    );
    if (selectedAddress) {
      onSelect(selectedAddress);
    }
  };
  return {
    addresses,
    isAdding,
    setIsAdding,
    editingAddress,
    setEditingAddress,
    loading,
    selected,
    onAddressChangeHandle,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
