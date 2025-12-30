"use client";
import React from "react";
import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/hooks/use-login";

export default function Loginclient() {
  const { formik, error, loading, data } = useLogin();
  return (
    <div>
      <LoginForm
        color="blue"
        formik={formik}
        error={error}
        loading={loading}
        data={data}
      />
    </div>
  );
}
