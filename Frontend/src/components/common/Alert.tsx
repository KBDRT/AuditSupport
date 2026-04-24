import type { AxiosError } from "axios";
import { toaster } from "../ui/toaster";
import type { ErrorsApi } from "@/types/ErrorsApi";

export const ShowToast = (message : string, description : string, type : string) => {
    toaster.create({
        title: message,
        description: description,
        type: type,
        duration: 2500,
    });
};

export const ShowError = (error: AxiosError) => 
{
    const err = error as AxiosError
    const errors = err.response?.data as ErrorsApi
    ShowToast("Произошла ошибка!", errors != undefined ? `${errors.message}` : "Неизвестная ошибка", "error")
}
