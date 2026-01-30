"use client";

import React from "react";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Button } from "@/components/atoms/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/Select";
import { useAddressForm } from "@/hooks/useAddressForm";
import type { AddressFormProps } from "@/types/address.types";

export default function AddressForm( { initialValues, onSubmit, onCancel }:  Readonly<AddressFormProps>) {
    const { formik, countries, states, cities } = useAddressForm({
        initialValues: initialValues ?? undefined,
        onSubmit,
    });
    return (
        <form onSubmit={  (e) => {
            e.preventDefault();
                 void formik.submitForm();
        }} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label className="text-xs font-bold text-slate-500 uppercase">Address Line 1</Label>
                    <Input
                        name="address_line1"
                        value={formik.values.address_line1}
                        onChange={formik.handleChange}
                        placeholder="House no, street, area"
                        className="h-10 focus:ring-blue-500"
                    />
                    {formik.errors.address_line1 && formik.touched.address_line1 && (
                        <div className="text-red-500 text-[10px] font-bold uppercase">{formik.errors.address_line1}</div>
                    )}
                </div>

                <div className="space-y-1">
                    <Label className="text-xs font-bold text-slate-500 uppercase">Address Line 2 (Optional)</Label>
                    <Input
                        name="address_line2"
                        value={formik.values.address_line2 || ""}
                        onChange={formik.handleChange}
                        placeholder="Landmark, building"
                        className="h-10"
                    />
                </div>

                <div className="space-y-1">
                    <Label className="text-xs font-bold text-slate-500 uppercase">Country</Label>
                    <Select
                        value={formik.values.country}
                        onValueChange={ async (val) => { 

                           await  formik.setFieldValue("country", val);
                           await formik.setFieldValue("state", "");
                           await  formik.setFieldValue("city", "");
                        }}
                    >
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((c) => (
                                <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label className="text-xs font-bold text-slate-500 uppercase">State</Label>
                    <Select
                        disabled={!formik.values.country}
                        value={formik.values.state}
                        onValueChange={async(val) => {
                             await formik.setFieldValue("state", val);
                             await formik.setFieldValue("city", "");
                        }}
                    >
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                            {states.map((s) => (
                                <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label className="text-xs font-bold text-slate-500 uppercase">City</Label>
                    <Select
                        disabled={!formik.values.state}
                        value={formik.values.city}
                        onValueChange={ async (val) => {  await formik.setFieldValue("city", val); }}
                    >
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((c) => (
                                <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label className="text-xs font-bold text-slate-500 uppercase">Pincode</Label>
                    <Input
                        name="pincode"
                        type="number"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        placeholder="Postal code"
                        className="h-10"
                    />
                    {formik.errors.pincode && formik.touched.pincode && (
                        <div className="text-red-500 text-[10px] font-bold uppercase">{formik.errors.pincode}</div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button variant="outline" type="button" onClick={onCancel} className="px-6">
                    Cancel
                </Button>
                <Button variant="default" type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    Save Address
                </Button>
            </div>
        </form>
    );
}
