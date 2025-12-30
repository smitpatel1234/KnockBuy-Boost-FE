"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SpinnerCustom } from "@/components/ui/loading";
import { FormikProps } from "formik";
import { LoginCredentials } from "@/types/auth.type";

export function LoginForm({
  className,
  formik,
  error,
  loading,
  data,
  color,
  disabled,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  disabled?: boolean,
  formik: FormikProps<LoginCredentials>,
  error: string | null,
  loading: boolean,
  data: boolean,
  color?: string
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>

          <form onSubmit={formik.handleSubmit} >
            <div className="flex flex-col gap-6 w-[400px]">
              <div className="grid gap-2">
                <Label htmlFor="identifier">
                  {" "}
                  Mobile number, email or username{" "}
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder=""
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.identifier}
                  autoComplete="off"
                />
                {formik.touched.identifier && formik.errors.identifier ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.identifier}
                  </div>
                ) : null}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder=""
                  autoComplete="off"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-sm text-red-600 break-words">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <Button
                type="submit"
                className={`w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${color !== 'blue' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                disabled={formik.isSubmitting || loading}
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={formik.isSubmitting || loading}
              >
                Login with Google
              </Button>
            </div>
            {disabled ? (
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            ) : null}
          </form>
        </CardContent>
        {error && (
          <div className="p-4 text-center text-sm text-red-700 bg-red-100 border border-red-400 rounded-md m-4 whitespace-normal">
            {error}
          </div>
        )}

        {
          loading && (
            <div className="p-4 text-center text-sm   m-4 whitespace-normal">
              <SpinnerCustom />
            </div>
          )
        }
        {

          data && (<div className="p-4 text-center text-sm text-green-700 bg-green-100 border border-green-400 rounded-md m-4 whitespace-normal">
            Login successful!
          </div>
          )
        }

      </Card>
    </div>
  );
}
