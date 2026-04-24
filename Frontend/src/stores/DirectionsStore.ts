import type { CreateDirectionRequest, DeleteDirectionParams, Direction, UpdateDirectionRequest} from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getDirection } from './../api/direction/direction';

interface DirectionsStore {
  items: Direction[]
  loading: boolean
  addItem: (item: Omit<CreateDirectionRequest, 'id'>) => Promise<boolean>
  updateItem: (id: string, item: Partial<UpdateDirectionRequest>) => Promise<boolean>
  deleteItem: (id: string) => Promise<boolean>
  getItem: (id: string) => Direction | undefined
  fetch: () => Promise<void>
}

export const api = getDirection(axiosInstance);

export const useDirectionsStore = create<DirectionsStore>((set, get) => ({
  items: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {

      const response = await api.getDirection()
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
      const response = await api.postDirection(newItem)
      if (response.status == 200)
      {
        set((state) => ({
          items: [...state.items, { ...newItem, id: response.data?.id}]
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
      const response = await api.putDirection(updatedItem)
      if (response.status == 200)
      {
        set((state) => ({
        items: state.items.map(item => 
          item.id === id ? {name: updatedItem.name, description: updatedItem.description, id: updatedItem.directionId} : item
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
    const request: DeleteDirectionParams = {
      guid: id
    }

    try
    {
      const response = await api.deleteDirection(request)
      if (response.status == 200)
      {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
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
  
  getItem: (id) => get().items.find(item => item.id === id),

}))