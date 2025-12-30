"use client";
import ProfilePicture from "../organisms/ProfilePicture";
import UserDetail from "../organisms/user/UserDetail";
import UserAddress from "../organisms/user/UserAddress";
import { useUserDetail } from "@/hooks/useUserDetail";
export default function UserProfileTemp() {
  const { formik, loading , uploading , handleImageUpload} = useUserDetail();

  return (
    <div className="w-full min-h-screen bg-muted/40">
      {/* Page Header */}

      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900"> User Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage personal information, addresses, and profile photo.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-background p-4">
              <h2 className="text-sm font-medium mb-3">Profile Photo</h2>
              <ProfilePicture setImage={handleImageUpload} loading={uploading} src={formik.values.profile_image} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6 justify-center">
            <div className="rounded-lg border bg-background p-4">
              <h2 className="text-sm font-medium mb-4">User Details</h2>
              <UserDetail formik={formik} loading={loading} />
            </div>

            <div className="rounded-lg border bg-background p-4 justify-center">
              <h2 className="text-sm font-medium mb-4">Addresses Details</h2>
              <UserAddress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
