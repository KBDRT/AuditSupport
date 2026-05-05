import type {CreateVersionRequest, EduProgramDTO, ProgramVersionDTO, UpdateProgramCommand, UpdateReviewCommand,  } from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getReview } from '@/api/review/review';
import type { GetReviewResponseDTO } from '@/api/models/getReviewResponseDTO';



interface ReviewStore {
  loading: boolean
  preSave: boolean
  endCheck: boolean
  review: GetReviewResponseDTO | null
  commentary: string | null,
  isSuccess: boolean,
  setPreSave: () => boolean
  setEndCheck: (isSuccess: boolean) => boolean
  fetchReview: (reviewId: string) => Promise<boolean>
  updateReview: (updatedProgram: UpdateReviewCommand) => Promise<boolean>
}

export const api = getReview(axiosInstance);

export const useReviewStore = create<ReviewStore>((set, get) => ({
  loading: false,
  preSave: false,
  review: {id: "", isFinished: false, isSuccess: false},
  commentary: null,
  endCheck: false,
  isSuccess: false,

  setPreSave: () => {set({ preSave: true }); return true },

  setEndCheck: (isSuccess) => {set({ endCheck: true, isSuccess: isSuccess }); return true },

  fetchReview: async (id) => {
    set({ loading: true });
    try 
    {
      const response = await api.getReviewId(id)
      if (response.status == 200) 
      {
        set({ commentary: response.data.commentary || "" });
        set({ review: response.data, loading: false });
        return true;
      } 
    }
    catch (error) 
    {
      ShowError(error as AxiosError)
      return false;
    }
    set({ loading: false });
    return false
  },
  
 updateReview: async (updatedProgram) =>  {
  try {
    const response = await api.patchReview({...updatedProgram, isSuccess: get().isSuccess})
    if (response.status === 200) {

      // if (updatedProgram.programId != undefined)
      // {
        // set((state) => ({
        //   program: {
        //     ...state.program,
        //     [updatedProgram.programId || ""]: {
        //       ...state.program,
        //       ...updatedProgram 
        //     }
        //   }
        // }))
      // }
      ShowToast("Обновлено!", "", "success")
      set({ preSave: false });
      return true;
    }
  } catch (error) {
    ShowError(error as AxiosError)
  }
  return false;
},

}))