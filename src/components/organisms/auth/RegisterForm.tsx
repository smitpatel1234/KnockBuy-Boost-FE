"use client";

import { Formik, Form } from "formik";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { registerSchema } from "@/utils/validation/schemas/register_user";
import { RegisterCredentials } from "@/types/auth.type";

interface RegisterFormProps {
  onSubmit: (values: RegisterCredentials) => void;
  isLoading?: boolean;
  error?: string;
}

export default function RegisterForm({
  onSubmit,
  isLoading = false,
  error,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthColor = (level: number) => {
    if (level <= 1) return "bg-red-500";
    if (level === 2) return "bg-yellow-500";
    if (level === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        phone_number: 0,
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      }}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => {
        const strength = passwordStrength(values.password);

        return (
          <Form className="space-y-4 w-full">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                {error}
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                name="username"
                value={values.username}
                onChange={handleChange}
                disabled={isLoading}
              />
              {touched.username && errors.username && (
                <p className="text-xs text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                name="phone_number"
                type="tel"
                value={values.phone_number}
                onChange={handleChange}
                disabled={isLoading}
              />
              {touched.phone_number && errors.phone_number && (
                <p className="text-xs text-red-600">{errors.phone_number}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {values.password && (
                <>
                  <div className="flex gap-1 h-1.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full ${i < strength ? strengthColor(strength) : "bg-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    {["Weak", "Fair", "Good", "Strong"][strength - 1] ??
                      "Weak"}{" "}
                    password
                  </p>
                </>
              )}

              {touched.password && errors.password && (
                <p className="text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-xs text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                checked={values.agreeToTerms}
                onCheckedChange={(v) =>
                  setFieldValue("agreeToTerms", v)
                }
              />
              <Label className="text-sm">
                I agree to the Terms and Privacy Policy
              </Label>
            </div>
            {touched.agreeToTerms && errors.agreeToTerms && (
              <p className="text-xs text-red-600">{errors.agreeToTerms}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
