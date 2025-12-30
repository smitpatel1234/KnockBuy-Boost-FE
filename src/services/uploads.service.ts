import api from "./api.service";

export const uploadFiles = async (files: File[], type: 'user' | 'category' | 'item' = 'item') => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });

    const response = await api.post(`/upload?type=${type}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
