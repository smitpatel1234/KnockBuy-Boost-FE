"use client";
import ProfilePicture from "../organisms/ProfilePicture";
import UserDetail from "../organisms/user/UserDetail";
import AddressSelection from "../organisms/checkout/AddressSelection";
import { useUserDetail } from "@/hooks/useUserDetail";
import { Package } from "lucide-react";
import { Card } from "@/components/atoms/Card";
export default function UserProfileTemp() {
  const { formik, loading, uploading, handleImageUpload } = useUserDetail();

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
              <p className="text-sm text-slate-500 font-medium">
                Manage your personal information, security preferences, and shipping addresses.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Side: Avatar and Quick Info */}
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
              <div className="p-6 w-full flex flex-col items-center">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 self-start px-2 border-l-4 border-blue-600">
                  Profile Photo
                </h3>
                <ProfilePicture
                  setImage={(file) => { void handleImageUpload(file); }}
                  loading={uploading}
                  src={formik.values.profile_image}
                />
                <div className="mt-6 text-center space-y-1">
                  <p className="font-bold text-slate-900 text-lg">{formik.values.username || "User"}</p>
                  <p className="text-sm text-slate-500 font-medium">{formik.values.email || "No email provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Forms */}
          <div className="xl:col-span-8 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-blue-600 pl-3">
                  Personal Details
                </h3>
              </div>
              <UserDetail formik={formik} loading={loading} />
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-blue-600 pl-3">
                  Delivery Addresses
                </h3>
              </div>
              <Card className="border-slate-200 shadow-none overflow-hidden">
                <div className="p-6">
                  <AddressSelection />
                </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
