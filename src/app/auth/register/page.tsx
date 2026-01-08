import type { Metadata } from "next";
import Link from "next/link";
import RegisterPageClient from "./register-client";

export const metadata: Metadata = {
  title: "Create Account - Store",
  description: "Sign up for a new account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us and start shopping today</p>
        </div>

        <RegisterPageClient />

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign in
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
