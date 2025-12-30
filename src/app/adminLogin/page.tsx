"use client";
import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/hooks/use-login";

export default function AdminPanelLogin() {
  const { formik, error, loading, data } = useLogin();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <LoginForm formik={formik} error={error} loading={loading} data={data} />
    </div>


  );
}
