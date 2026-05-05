import { ShowError } from "@/components/common/Alert"
import type { AxiosError } from "axios"
import { axiosInstance } from "./axiosInstanse";
import { getEduProgram } from "@/api/edu-program/edu-program";
import type { ChangeProgramStatusCommand, ShortCheckErrorDTO} from "@/api/models";
import { getReview } from "@/api/review/review";
import type { ShortReviewResponseDTO } from "@/api/models/shortReviewResponseDTO";

const api = getReview(axiosInstance);


export const GetReviewsForProgram = async (id: string): Promise<ShortReviewResponseDTO[]> => 
{
    try {
      const response = await api.getReviewsForProgram(id)
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
