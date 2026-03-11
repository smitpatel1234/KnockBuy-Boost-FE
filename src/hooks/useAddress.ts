import React, { useState, useEffect } from "react";
import {
  getAllAddressByUserId,
  createAddress,
} from "@/services/address.service";
import {
  updateAddress as updateAddressService,
  deleteAddress,
} from "@/services/address.service";
import { useParams } from "next/navigation";
import type { Address, AddAddress } from "@/types/address.types";
import {
  getAllAddressByUserIdInParams,
  createAddressInParams
} from "@/services/address.service";

export const useAddress = (onSelect?: (address: Address) => void) => {
  const { user_id } = useParams();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const fetchAddresses = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = user_id
        ? await getAllAddressByUserIdInParams(user_id as string)
        : await getAllAddressByUserId();
      setAddresses(response.data.data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setLoading(false);
    }
  }, [user_id]);

  useEffect(() => {
    void fetchAddresses();
  }, [fetchAddresses]);

  const handleCreate = async (values: Address | AddAddress) => {
    try {
      if (user_id) {
        await createAddressInParams(values as AddAddress, user_id as string);
      } else {
        await createAddress(values as AddAddress);
      }
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
    if (onSelect) {
      const selectedAddress = addresses.find(
        (addr) => addr.address_id === addressId
      );
      if (selectedAddress) {
        onSelect(selectedAddress);
      }
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
