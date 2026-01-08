import type { Metadata } from "next";
import Link from "next/link";
import LoginPageClient from "./login-client";

export const metadata: Metadata = {
  title: "Login - Store",
  description: "Sign in to your account",
};


export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue shopping</p>
        </div>

        {/* Login Form Client Component */}
        <LoginPageClient />

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-semibold">
              Create one
            </Link>
          </p>
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
