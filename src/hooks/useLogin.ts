"use client";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { loginUser } from "@/redux/features/auth-slice";
import type { LoginCredentials } from "../types/auth.types";
import { LoginCredentialsSchema } from "../utils/validation/schemas/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import type ReCAPTCHA from "react-google-recaptcha";
export const useLogin = ({ Role }: { Role: string | undefined }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<boolean>(false);
  const reRef = useRef<ReCAPTCHA>(null);
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
         const token = await reRef.current?.executeAsync();
        setLoading(true);
        setError(null);
        values={...values, recaptchaToken:  token};
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
    reRef,
  };
};
