"use client";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { Mail, User as UserIcon, Calendar } from "lucide-react";
import { Package } from "lucide-react";
import OrderHistory from "@/components/organisms/profile/OrderHistory";import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading } = useAppSelector((state) => state.auth);
 const router = useRouter()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-4">
          Please log in to view your profile.
        </p>
        <button
          onClick={() => {
            router.push("/auth/login");
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-inner">
            {user.username?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.username}
            </h1>
            <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
              <Mail className="h-4 w-4" /> {user.email}
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                Customer
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-gray-400" /> Personal
              Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Full Name</span>
                <span className="text-sm font-medium text-gray-900">
                  {user.username}
                </span>
              </div>
              {/* Add more fields here as available in AuthUser type */}
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">User ID</span>
                <span className="text-xs font-mono text-gray-400">
                  {user.user_id}
                </span>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" /> Account Activity
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Member Since</span>
                <span className="text-sm font-medium text-gray-900">N/A</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Last Login</span>
                <span className="text-sm font-medium text-gray-900">Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-400" /> Order History
          </h2>
          <OrderHistory router={router} />
        </div>
      </div>
    </div>
  );
}

