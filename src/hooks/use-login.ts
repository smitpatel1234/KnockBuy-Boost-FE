"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { login } from "../services/auth.service";
import { LoginCredentials } from "../types/auth.type";
import { LoginCredentialsSchema } from "../utils/validation/schemas/auth";
import { useRouter } from "next/navigation";
export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: LoginCredentialsSchema,
    onSubmit: async (values: LoginCredentials, { resetForm }) => {
      try {
        setLoading(true);
        setError(null);
        const response = await login(values);
        if (response.status !== 200)
          throw new Error(response.data?.toString() || "Login failed");
        else if (response.status === 200) {
          setData(true);
          await router.push("/adminLogin/admin");
          setData(false);
        }
      } catch (err: unknown) {
        let errorMessage = "Login failed";

        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (
          typeof err === "object" &&
          err !== null &&
          "response" in err
        ) {
          const errorWithResponse = err as {
            response?: { data?: { message?: string } };
          };
          if (errorWithResponse.response?.data?.message) {
            errorMessage = errorWithResponse.response.data.message;
          }
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
      await resetForm();
    },
  });

  return {
    formik,
    loading,
    error,
    data,
  };
};
