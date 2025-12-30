"use client";

import { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "next/navigation";
import { getUser, updateUser } from "@/services/user.service";
import { toast } from "sonner";
import { uploadFiles } from "../services/uploads.service";

export const useUserDetail = () => {
    const { user_id } = useParams();
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            user_id: "",
            username: "",
            email: "",
            phone_number: 0,
            wishlist_name: "",
            profile_image: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            phone_number: Yup.number().required("Phone number is required"),
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
            formik.setValues({
                user_id: userData.user_id,
                username: userData.username,
                email: userData.email,
                phone_number: userData.phone_number,
                wishlist_name: userData.wishlist_name || "",
                profile_image: userData.profile_image || "",
            });
        } catch (err) {
            console.error("[FETCH USER ERROR]", err);
            toast.error("Failed to fetch user details");
        } finally {
            setLoading(false);
        }
    }, [user_id, formik.setValues]);

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (file: File) => {
        try {
            setUploading(true);
            const url = await uploadFiles([file], 'user');
            if (url && url.data && url.data.url) {
                formik.setFieldValue('profile_image', url.data.url);
                toast.success("Profile image uploaded successfully");
            } else {
                toast.error("Invalid response from server");
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        formik,
        handleImageUpload,
        uploading,
        loading,
        refreshUser: fetchUser,
    };
};
