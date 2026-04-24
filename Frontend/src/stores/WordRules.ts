import type { CreateWordRuleRequest, DeleteRuleWordParams, GetWordRuleResponseDTO, UpdateWordRuleRequest} from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getRule } from '@/api/rule/rule';

interface WordRulesStore {
  items: GetWordRuleResponseDTO[]
  loading: boolean
  addItem: (item: Omit<CreateWordRuleRequest, 'id'>) => Promise<boolean>
  updateItem: (id: string, item: Partial<UpdateWordRuleRequest>) => Promise<boolean>
  deleteItem: (id: string) => Promise<boolean>
  fetch: () => Promise<void>
}

export const api = getRule(axiosInstance);

export const useWordRulesStore = create<WordRulesStore>((set, get) => ({
  items: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {

      const response = await api.getRuleWord()
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
      const response = await api.postRuleWord(newItem)
      if (response.status == 200)
      {
        set((state) => ({
          items: [...state.items, { ...newItem, ruleId: response.data?.id}]
        }))
        ShowToast("Сохранено!", "", "success")
        return true
      }
      else
      {
        ShowToast("Внимание!", `${response?.data}`, "warning")
        return false
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
      return false
    }
  },


  updateItem: async (id, updatedItem) => {
    try
    {
      const response = await api.putRuleWord(updatedItem)
      if (response.status == 200)
      {
        set((state) => ({
        items: state.items.map(item => 
          item.ruleId === id ? {ruleId: updatedItem.ruleId, word: updatedItem.word, commentary: updatedItem.commentary} : item
        )}))
        // get().filterUsers({ statusCode: "all", searchField: "", roles: [] })
        ShowToast("Обновлено!", "", "success")
        return true
      }
      else
      {
        ShowToast("Внимание!", `${response?.data}`, "warning")
        return false
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
      return false
    }
  },
  
  deleteItem: async (id) => {
    const request: DeleteRuleWordParams = {
      ruleId: id
    }

    try
    {
      const response = await api.deleteRuleWord(request)
      if (response.status == 200)
      {
        set((state) => ({
          items: state.items.filter(item => item.ruleId !== id)
        }))
        ShowToast("Удалено!", "", "success")
        return true
      }
      else
      {
        ShowToast("Внимание!", `${response?.data}`, "warning")
        return false
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
      return false
    }
  },
  
}))