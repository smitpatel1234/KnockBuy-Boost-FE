"use client";
import { LoginForm } from "@/components/molecules/LoginForm";
import { useLogin } from "@/hooks/useLogin";

export default function AdminPanelLogin() {
  const { formik, error, loading, data, reRef } = useLogin({ Role: "ADMIN" });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <LoginForm formik={formik} error={error} loading={loading} data={data} reRef={reRef} />
    </div>


  );
}
