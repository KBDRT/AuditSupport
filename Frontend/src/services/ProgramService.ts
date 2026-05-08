import { ShowError } from "@/components/common/Alert"
import type { AxiosError } from "axios"
import { axiosInstance } from "./axiosInstanse";
import { getEduProgram } from "@/api/edu-program/edu-program";
import type { ChangeProgramStatusCommand, ShortCheckErrorDTO} from "@/api/models";
import type { ProgramHistoryDTO } from "@/api/models/programHistoryDTO";

const api = getEduProgram(axiosInstance);


export const GetErrorsForVersion = async (id: string): Promise<ShortCheckErrorDTO[]> => 
{
    try {
      const response = await api.getEduProgramErrorsCheckId(id)
      if (response.status == 200)
      {
        return response.data;
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }

    return [];
}

export const ChangeStatus = async (request: ChangeProgramStatusCommand) => {
  try {

    const response = await api.patchEduProgramStatus(request)
    if (response.status == 200)
    {

      return true;
    }
  }
  catch (error)
  {
    ShowError(error as AxiosError)
  }

  return false;
}

export const GetHistory = async (programId: string): Promise<ProgramHistoryDTO[]> => 
{
    try {
      const response = await api.getEduProgramHistory(programId)
      if (response.status == 200)
      {
        return response.data;
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }

    return [];
}