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
    if (!err.response) {
        ShowToast("Ошибка сети", "Сервер недоступен", "error")
        return
    }

    const errors = err.response?.data as ErrorsApi
    
    if (errors?.message) {
        ShowToast("Произошла ошибка!", errors.message, "error")
        return
    }
    
    switch (err.response.status) {
        case 400:
            ShowToast("Ошибка запроса", "Неверные параметры запроса", "error")
            break
        case 401:
            ShowToast("Не авторизован", "Пожалуйста, войдите в систему", "error")
            break
        case 403:
            ShowToast("Доступ запрещён", "У вас нет прав для этого действия", "error")
            break
        case 404:
            ShowToast("Не найдено", "Запрашиваемый ресурс не существует", "error")
            break
        case 500:
            ShowToast("Ошибка сервера", "Попробуйте позже", "error")
            break
        default:
            ShowToast("Ошибка", `Статус: ${err.response.status}`, "error")
    }
}
