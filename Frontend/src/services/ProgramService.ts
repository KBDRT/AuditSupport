import { ShowError, ShowToast } from "@/components/common/Alert"
import type { AxiosError } from "axios"
import { axiosInstance } from "./axiosInstanse";
import { getEduProgram } from "@/api/edu-program/edu-program";
import type { CreateProgramCommand, EduProgramDTO, UpdateProgramCommand } from "@/api/models";

const api = getEduProgram(axiosInstance);

export const GetProgram = async (id: string): Promise<EduProgramDTO | undefined> => 
{
    // set({ loading: true });
    try {

      const response = await api.getEduProgramProgramId(id)
      if (response.status == 200)
      {
        return response.data;
        // set({ items: response.data, loading: false });
        // get().useFilter()
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }
}

export const UpdateProgram = async (updatedProgram: UpdateProgramCommand): Promise<boolean> => 
{
    // set({ loading: true });
    try {

      const response = await api.patchEduProgram(updatedProgram)
      if (response.status == 200)
      {
        ShowToast("Обновлено!", "", "success")
        return true;
        // set({ items: response.data, loading: false });
        // get().useFilter()
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }
    return false;
}

export const CreateProgram = async (newProgram: CreateProgramCommand): Promise<boolean> => 
{
    // set({ loading: true });
    console.log(newProgram)
    try {

      const response = await api.postEduProgram(newProgram)
      if (response.status == 200)
      {
        ShowToast("Сохранено!", "", "success")
        return true;
        // set({ items: response.data, loading: false });
        // get().useFilter()
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }
    return false;
}