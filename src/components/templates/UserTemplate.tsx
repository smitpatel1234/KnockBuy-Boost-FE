"use client";

import React from "react";
import TableWithFilter from "@/components/organisms/TableWithFilter";
import { userColumn } from "@/data/userColumn";
import { deleteUser } from "@/services/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import type { UserProfile } from "@/types/user.types";
import { fetchUser } from "@/redux/features/user-slice";
import type { PageParams } from "@/types/pagination.types";
export default function UserTemp() {

  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const handleEdit = (user: UserProfile) => {
    router.push(`/adminLogin/admin/user/${user.user_id}`);
  };

  const handleDelete = async (user: UserProfile) => {
    try {
      await deleteUser(user.user_id);
      void fetchData({
        pagination: { page: 1, limit: 10 },
        filters: [],
        sort: []
      });
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };
  const fetchData = async (PageParams: PageParams): Promise<number> => {
    const res = await dispatch(fetchUser(PageParams)).unwrap();
    return res.meta.total;
  }
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            User Management
          </h1>
          <p className="text-sm text-slate-500">Manage your system users, their roles, and addresses.</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <TableWithFilter<UserProfile>
          data={user}
          dataOfColumn={userColumn}
          fetchData={fetchData}
          onEdit={handleEdit}
          onDelete={(user) => { void handleDelete(user); }}
        />
      </div>
    </div>
  );
}
