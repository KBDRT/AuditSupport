import { toaster } from "../ui/toaster";

export const showToast = (message : string, description : string, type : string) => {
    toaster.create({
        title: message,
        description: description,
        type: type,
        duration: 2500,
    });
};