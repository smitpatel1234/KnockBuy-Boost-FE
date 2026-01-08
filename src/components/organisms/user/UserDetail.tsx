"use client";

import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Button } from "@/components/atoms/Button";
import type { FormikProps } from "formik";
import type { UserProfile as User } from "@/types/user.types";

interface UserDetailProps {
  formik: FormikProps<User>;
  loading?: boolean;
}

export default function UserDetail({ formik, loading }: UserDetailProps) {
  if (loading) return (
    <div className="animate-pulse flex flex-col gap-4">
      <div className="h-10 bg-slate-100 rounded"></div>
      <div className="h-10 bg-slate-100 rounded"></div>
      <div className="h-10 bg-slate-100 rounded"></div>
    </div>
  );

  return (
    <Card className="w-full border-slate-200 shadow-none">
      <CardContent className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-500 uppercase">Username</Label>
              <Input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                className="h-10 focus:ring-blue-500"
                placeholder="Username"
              />
              {formik.errors.username && formik.touched.username && (
                <div className="text-red-500 text-[10px] font-bold uppercase">{formik.errors.username}</div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-500 uppercase">Email Address</Label>
              <Input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="h-10 focus:ring-blue-500"
                placeholder="Email"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-[10px] font-bold uppercase">{formik.errors.email}</div>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-500 uppercase">Phone Number</Label>
              <Input
                name="phone_number"
                type="tel"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                className="h-10 focus:ring-blue-500"
                placeholder="Phone number"
              />
              {formik.errors.phone_number && formik.touched.phone_number && (
                <div className="text-red-500 text-[10px] font-bold uppercase">{formik.errors.phone_number}</div>
              )}
            </div>

            {/* Wishlist */}
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-500 uppercase">Wishlist Name</Label>
              <Input
                name="wishlist_name"
                value={formik.values.wishlist_name}
                onChange={formik.handleChange}
                className="h-10 focus:ring-blue-500"
                placeholder="Wishlist name"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 font-bold uppercase tracking-wider text-xs shadow-md transition-all h-10"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
