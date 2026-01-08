import { toast} from "sonner"; 
export const showToast = (message: string, StatusCodes:number) => {
    if (StatusCodes >= 200 && StatusCodes < 300) {
        toast.success(message);
    } else if (StatusCodes >= 400 && StatusCodes <= 500) {
        toast.error(message);
    } else {
        toast.info(message);
    }
};
     