"use client";
import React from "react";
import { LoginForm } from "@/components/molecules/LoginForm";
import { useLogin } from "@/hooks/useLogin";

export default function Loginclient() {

  const { formik, error, loading, data } = useLogin({ Role: "USER" });
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
