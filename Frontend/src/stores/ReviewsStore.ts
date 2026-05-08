import type { CreateReviewCommand} from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getReview } from '@/api/review/review';
import type { ShortReviewResponseDTO } from '@/api/models/shortReviewResponseDTO';

interface ReviewsStoreProps {
  items: ShortReviewResponseDTO[]
  loading: boolean
  addItem: (item: CreateReviewCommand) => Promise<string>
  fetch: (programId: string) => Promise<void>
}

export const api = getReview(axiosInstance);

export const useReviewsStore = create<ReviewsStoreProps>((set) => ({
  items: [],
  loading: false,


  fetch: async (programId) => {
    set({ loading: true });
    try {

      const response = await api.getReviewsForProgram(programId)
      if (response.status == 200)
      {
        set({ items: response.data, loading: false });
        // get().useFilter()
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }
  },

  
  addItem: async (newItem) => {
    try
    {
      const response = await api.postReview(newItem)
      if (response.status == 200)
      {
        set((state) => ({
          items: [...state.items, { id: response.data?.id, auditor: "", createdDate: new Date().toISOString(), isFinished: false, isSuccess: false }]
        }))
        ShowToast("Сохранено!", "", "success")
        return response.data?.id || ""
      }
      else
      {
        ShowToast("Внимание!", `${response?.data}`, "warning")
        return ""
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
      return ""
    }
  },


  // updateItem: async (id, updatedItem) => {
  //   try
  //   {
  //     const response = await api.putRuleWord(updatedItem)
  //     if (response.status == 200)
  //     {
  //       set((state) => ({
  //       items: state.items.map(item => 
  //         item.ruleId === id ? {ruleId: updatedItem.ruleId, word: updatedItem.word, commentary: updatedItem.commentary} : item
  //       )}))
  //       // get().filterUsers({ statusCode: "all", searchField: "", roles: [] })
  //       ShowToast("Обновлено!", "", "success")
  //       return true
  //     }
  //     else
  //     {
  //       ShowToast("Внимание!", `${response?.data}`, "warning")
  //       return false
  //     }
  //   }
  //   catch (error)
  //   {
  //     ShowError(error as AxiosError)
  //     return false
  //   }
  // },
  
  // deleteItem: async (id) => {
  //   const request: DeleteRuleWordParams = {
  //     ruleId: id
  //   }

  //   try
  //   {
  //     const response = await api.deleteRuleWord(request)
  //     if (response.status == 200)
  //     {
  //       set((state) => ({
  //         items: state.items.filter(item => item.ruleId !== id)
  //       }))
  //       ShowToast("Удалено!", "", "success")
  //       return true
  //     }
  //     else
  //     {
  //       ShowToast("Внимание!", `${response?.data}`, "warning")
  //       return false
  //     }
  //   }
  //   catch (error)
  //   {
  //     ShowError(error as AxiosError)
  //     return false
  //   }
  // },
  
}))