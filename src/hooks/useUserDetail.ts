"use client";

import { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "next/navigation";
import { getUser, updateUser } from "@/services/user.service";
import { toast } from "sonner";
import { uploadFiles } from "../services/uploads.service";
import type { UserProfile } from "@/types/user.types";

export const useUserDetail = () => {
    const { user_id } = useParams();
    const [loading, setLoading] = useState(true);

    const formik = useFormik<UserProfile>({
        initialValues: {
            user_id: "",
            username: "",
            email: "",
            phone_number: '',
            wishlist_name: '',
            profile_image: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            phone_number: Yup.string().required("Phone number is required"),
        }),
        onSubmit: async (values) => {
            try {
                await updateUser(values);
                toast.success("User profile updated successfully");
            } catch (error) {
                toast.error("Failed to update user profile");
                console.error("[UPDATE USER ERROR]", error);
            }
        },
    });

    const fetchUser = useCallback(async () => {
        if (!user_id) return;
        try {
            setLoading(true);
            const response = await getUser(user_id as string);
            const userData = response.data.data;
            void formik.setValues({
                user_id: userData.user_id,
                username: userData.username,
                email: userData.email,
                phone_number: userData.phone_number,
                wishlist_name: userData.wishlist_name ?? '',
                profile_image: userData.profile_image ?? '',
            });
        } catch (err) {
            console.error("[FETCH USER ERROR]", err);
            toast.error("Failed to fetch user details");
        } finally {
            setLoading(false);
        }
    }, [user_id]);

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (file: File) => {
        try {
            setUploading(true);
            const uploadRes = await uploadFiles([file], 'user') as { data: { url?: string } } ;
            if (uploadRes.data?.url) {
                void formik.setFieldValue('profile_image', uploadRes.data.url);
                toast.success("Profile image uploaded successfully");
            } else {
                toast.error("Invalid response from server");
            }

        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        void fetchUser();
    }, [fetchUser]);

    return {
        formik,
        handleImageUpload,
        uploading,
        loading,
        refreshUser: fetchUser,
    };
};
