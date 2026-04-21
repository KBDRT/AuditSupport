import type {  ChangeYearStatusRequest, CreateYearRequest, DeleteEduYearParams,  EduYear,  PostEduYearNotificationsParams,  UpdateYearRequest} from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { showToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import type { ErrorsApi } from '@/types/ErrorsApi';
import { getEduYear } from '@/api/edu-year/edu-year';
import { mergeUpdateToYear } from '@/utils/Mappers';

interface YearsStore {
  items: EduYear[]
  loading: boolean
  addItem: (item: Omit<CreateYearRequest, 'id'>) => Promise<boolean>
  updateItem: (id: string, item: Partial<UpdateYearRequest>) => Promise<boolean>
  deleteItem: (id: string) => Promise<boolean>
  changeStatus: (id: string, newStatus: boolean, sendNotification: boolean) => Promise<boolean>
  notificateUsers: (yearId: string) => Promise<boolean>
  fetch: () => Promise<void>
}

export const api = getEduYear(axiosInstance);

export const useYearsStore = create<YearsStore>((set, get) => ({
  items: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {

      const response = await api.getEduYear()
      if (response.status == 200)
      {
        set({ items: response.data, loading: false });
      }
    }
    catch (error)
    {
      const err = error as AxiosError
      const errors = err.response?.data as ErrorsApi
      showToast("Произошла ошибка!", errors != undefined ? `${errors.message}` : "Неизвестная ошибка", "error")
    }
  },

  
  addItem: async (newItem) => {
    try
    {
      const response = await api.postEduYear(newItem)
      if (response.status == 200)
      {
        set((state) => ({
          items: [...state.items, { ...newItem, id: response.data?.id, period: newItem.startYear != undefined ? `${newItem.startYear}-${newItem.startYear + 1}`: "-", }]
        }))
        showToast("Сохранено!", "", "success")
        return true
      }
      else
      {
        showToast("Внимание!", `${response?.data}`, "warning")
        return false
      }
    }
    catch (error)
    {
      const err = error as AxiosError
      const errors = err.response?.data as ErrorsApi
      showToast("Произошла ошибка!", errors != undefined ? `${errors.message}` : "Неизвестная ошибка", "error")
      return false
    }
  },


  updateItem: async (id, updatedItem) => {
    try
    {
      console.log(updatedItem)

      const response = await api.putEduYear(updatedItem)
      if (response.status == 200)
      {
        set((state) => ({
        items: state.items.map(item => 
          item.id === id ? mergeUpdateToYear(item, updatedItem) : item
        )}))
        showToast("Обновлено!", "", "success")
        return true
      }
      else
      {
        showToast("Внимание!", `${response?.data}`, "warning")
        return false
      }
    }
    catch (error)
    {
      const err = error as AxiosError
      const errors = err.response?.data as ErrorsApi
      showToast("Произошла ошибка!", errors != undefined ? `${errors.message}` : "Неизвестная ошибка", "error")
      return false
    }
  },
  
  deleteItem: async (id) => {
    const request: DeleteEduYearParams = {
      guid: id
    }

    try
    {
      const response = await api.deleteEduYear(request)
      if (response.status == 200)
      {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
        showToast("Удалено!", "", "success")
        return true
      }
      else
      {
        showToast("Внимание!", `${response?.data}`, "warning")
        return false
      }
    }
    catch (error)
    {
      const err = error as AxiosError
      const errors = err.response?.data as ErrorsApi
      showToast("Произошла ошибка!", errors != undefined ? `${errors.message}` : "Неизвестная ошибка", "error")
      return false
    }
  },

  changeStatus: async (id, newStatus, sendNotification) => {
    const request: ChangeYearStatusRequest = {
      yearId: id,
      isOpenYear: newStatus,
      isNotificateUsers: sendNotification
    }

    try
    {
      const response = await api.patchEduYear(request)
      if (response.status == 200)
      {
        set((state) => ({
        items: state.items.map(item => 
          item.id === id ? {...item, isOpened: newStatus} : item
        )}))
        showToast("Изменено!", "", "success")
        return true
      }
      else
      {
        showToast("Внимание!", `${response?.data}`, "warning")
        return false
      }
    }
    catch (error)
    {
      const err = error as AxiosError
      const errors = err.response?.data as ErrorsApi
      showToast("Произошла ошибка!", errors != undefined ? `${errors.message}` : "Неизвестная ошибка", "error")
      return false
    }
  },

  notificateUsers: async (yearId) => {
    const request: PostEduYearNotificationsParams = {
      yearId: yearId
    }

    try
    {
      const response = await api.postEduYearNotifications(request)
      if (response.status == 200)
      {
        showToast("Уведомлено!", "", "success")
        return true
      }
      else
      {
        showToast("Внимание!", `${response?.data}`, "warning")
        return false
      }
    }
    catch (error)
    {
      const err = error as AxiosError
      const errors = err.response?.data as ErrorsApi
      showToast("Произошла ошибка!", errors != undefined ? `${errors.message}` : "Неизвестная ошибка", "error")
      return false
    }
  },
  
}))