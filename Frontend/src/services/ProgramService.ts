import { ShowError, ShowToast } from "@/components/common/Alert"
import type { AxiosError } from "axios"
import { axiosInstance } from "./axiosInstanse";
import { getEduProgram } from "@/api/edu-program/edu-program";
import type { CreateProgramCommand, ShortCheckErrorDTO} from "@/api/models";

const api = getEduProgram(axiosInstance);



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

export const GetErrorsForVersion = async (id: string): Promise<ShortCheckErrorDTO[]> => 
{
    try {
      const response = await api.getEduProgramErrorsCheckId(id)
      if (response.status == 200)
      {
        console.log(response.data)
        return response.data;
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }

    return [];
}