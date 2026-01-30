"use client";

import { useFormik } from "formik";
import { useMemo } from "react";
import locationData from "../data/locationData.json";
import type { Address, AddAddress } from "../types/address.types";
import { AddressSchema } from "../schemas/address.schema";

interface UseAddressFormProps {
  initialValues?: Partial<Address>;
  onSubmit: (values: Address | AddAddress) => void | Promise<void>;
}

export const useAddressForm = ({
  initialValues,
  onSubmit,
}: UseAddressFormProps) => {
  const formik = useFormik<Address | AddAddress>({
    initialValues: {
      address_id: initialValues?.address_id ,
      address_line1: initialValues?.address_line1,
      address_line2: initialValues?.address_line2 ,
      country: initialValues?.country,
      state: initialValues?.state ,
      city: initialValues?.city ,
      pincode: initialValues?.pincode ,
    } as Address | AddAddress,
    validationSchema: AddressSchema,
    onSubmit: async  (values) => {
      try {
            if ('address_id' in values && values.address_id) {

        await onSubmit(values);
      } else {
        const { address_id: _, ...data } = values as Address;
        await onSubmit(data as AddAddress);
      }
      }
      catch(error){
        console.error("Error submitting address form:", error);
      }
      
    },
    enableReinitialize: true,
  });

  const countries = useMemo(
    () => locationData.countries.map((c) => ({ id: c.id, name: c.name })),
    []
  );

  const states = useMemo(() => {
    const selectedCountry = locationData.countries.find(
      (c) => c.name === formik.values.country || c.id === formik.values.country
    );
    return (
      selectedCountry?.states.map((s) => ({ id: s.id, name: s.name })) ?? []
    );
  }, [formik.values.country]);

  const cities = useMemo(() => {
    const selectedCountry = locationData.countries.find(
      (c) => c.name === formik.values.country || c.id === formik.values.country
    );
    const selectedState = selectedCountry?.states.find(
      (s) => s.name === formik.values.state || s.id === formik.values.state
    );
    return selectedState?.cities.map((c) => ({ id: c, name: c })) ?? [];
  }, [formik.values.country, formik.values.state]);



  return {
    formik,
    countries,
    states,
    cities,
  };
};
