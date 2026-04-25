import type { CreateSectionRuleRequest, DeleteRuleWordParams, GetSectionRuleResponseDTO, UpdateSectionRuleRequest} from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getRule } from '@/api/rule/rule';

interface SectionRulesStore {
  items: GetSectionRuleResponseDTO[]
  loading: boolean
  addItem: (item: Omit<CreateSectionRuleRequest, 'id'>) => Promise<boolean>
  updateItem: (id: string, item: Partial<UpdateSectionRuleRequest>) => Promise<boolean>
  deleteItem: (id: string) => Promise<boolean>
  fetch: () => Promise<void>
}

export const api = getRule(axiosInstance);

export const useSectionRulesStore = create<SectionRulesStore>((set) => ({
  items: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {

      const response = await api.getRuleSection()
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
      const response = await api.postRuleSection(newItem)
      if (response.status == 200)
      {
        set((state) => ({
          items: [...state.items, { ...newItem, ruleId: response.data?.id, sectionName: newItem.sectionName, commentary: newItem.commentary, structure: newItem.structure, type: newItem.type}]
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
    console.log(updatedItem)
    try
    {
      const response = await api.putRuleSection(updatedItem)
      if (response.status == 200)
      {
        set((state) => ({
        items: state.items.map(item => 
          item.ruleId === id ? {ruleId: updatedItem.ruleId, sectionName: updatedItem.sectionName, commentary: updatedItem.commentary, structure: updatedItem.structure, type: updatedItem.type} : item
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
      const response = await api.deleteRuleSection(request)
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