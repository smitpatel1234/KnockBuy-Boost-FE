"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
import locationData from "../data/locationData.json";
import { Address, AddAddress } from "../types/address.type";

interface UseAddressFormProps {
  initialValues?: Partial<Address>;
  onSubmit: (values: Address | AddAddress) => void;
}

export const useAddressForm = ({
  initialValues,
  onSubmit,
}: UseAddressFormProps) => {
  const formik = useFormik({
    initialValues: {
      address_id: initialValues?.address_id || "",
      address_line1: initialValues?.address_line1 || "",
      address_line2: initialValues?.address_line2 || "",
      country: initialValues?.country || "",
      state: initialValues?.state || "",
      city: initialValues?.city || "",
      pincode: initialValues?.pincode || 0,
    },
    validationSchema: Yup.object({
      address_line1: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      pincode: Yup.number().required("Required").positive().integer(),
    }),
    onSubmit: (values) => {
      const { address_id, ...data } = values;
      if (address_id) {
        onSubmit(values as Address);
      } else {
        onSubmit(data as AddAddress);
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
      selectedCountry?.states.map((s) => ({ id: s.id, name: s.name })) || []
    );
  }, [formik.values.country]);

  const cities = useMemo(() => {
    const selectedCountry = locationData.countries.find(
      (c) => c.name === formik.values.country || c.id === formik.values.country
    );
    const selectedState = selectedCountry?.states.find(
      (s) => s.name === formik.values.state || s.id === formik.values.state
    );
    return selectedState?.cities.map((c) => ({ id: c, name: c })) || [];
  }, [formik.values.country, formik.values.state]);

  // Reset state when country changes
  useEffect(() => {
    if (formik.values.country && !initialValues?.country) {
      // Only reset if it's not the initial load or if the value actually changed
    }
  }, [formik.values.country]);

  return {
    formik,
    countries,
    states,
    cities,
  };
};
