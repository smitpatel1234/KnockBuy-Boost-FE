export const formatDate = (date: unknown): string| undefined => {
    if (!date) {
        return date as string | undefined;
    }
    const dateOfTypeDate = new Date(date as string | number | Date);
    const year = dateOfTypeDate.getFullYear();
    const month = String(dateOfTypeDate.getMonth() + 1).padStart(2, '0');
    const day = String(dateOfTypeDate.getDate()).padStart(2, '0');
    return `${String(year)}-${month}-${day}`;
};

export const DateToTime = (date: string | undefined): string | undefined => {
    if (!date) {
        return date;
    }
    const dateOfTypeDate = new Date(`${date} GMT+0530`);
    return dateOfTypeDate.toISOString();
};