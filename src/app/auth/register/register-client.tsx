"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import RegisterForm from "@/components/organisms/auth/RegisterForm";
import type { RegisterFormValues } from "@/types/registerform.types";
import { register } from "@/services/auth.service";

export default function RegisterPageClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleRegister = async (formValues: RegisterFormValues) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const { confirmPassword: _confirmPassword, agreeToTerms: _agreeToTerms, ...credentials } = formValues;

      const response = await register(credentials);
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      setIsSuccessful(true);
      alert("Account created successfully! (Mock)");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccessful) {
    return (
      <Card className="border-slate-200 p-6 bg-green-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Account Created!
            </h3>
            <p className="text-sm text-gray-600">
              Welcome to our store. You can now start shopping.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 p-6">
      <RegisterForm
        onSubmit={(values) => void handleRegister(values)}
        isLoading={isLoading}
        error={error}
      />
    </Card>
  );
}
