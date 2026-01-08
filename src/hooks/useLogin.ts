"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { loginUser } from "@/redux/features/auth-slice";
import type { LoginCredentials } from "../types/auth.types";
import { LoginCredentialsSchema } from "../utils/validation/schemas/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
export const useLogin = ({ Role }: { Role: string | undefined }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<boolean>(false);
  const formik = useFormik<LoginCredentials>({
    initialValues: {
      identifier: "",
      password: "",
      role: Role ?? "ADMIN",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: LoginCredentialsSchema,
    onSubmit: async (values: LoginCredentials, { resetForm }) => {
      try {
        setLoading(true);
        setError(null);
        const response = await dispatch(loginUser(values)).unwrap();
        if (response.status !== 200) {
          throw new Error(typeof response.data === 'object' ? response.data.message : "Login failed");
        }
        setData(true);
        if (values.role === "ADMIN")
          router.push("/adminLogin/admin");
        if (values.role === "USER")
          router.push("/");
        setData(false);
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
      resetForm();
    },
  });

  return {
    formik,
    loading,
    error,
    data,
  };
};
