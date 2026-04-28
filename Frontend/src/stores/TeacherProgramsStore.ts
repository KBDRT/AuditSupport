import type {          ShortYearDTO,  } from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getEduProgram } from '@/api/edu-program/edu-program';

interface TeacherProgramsStore {
  items: ShortYearDTO[]
  loading: boolean
  // addItem: (item: Omit<CreateYearRequest, 'id'>) => Promise<boolean>
  // updateItem: (id: string, item: Partial<UpdateYearRequest>) => Promise<boolean>
  // deleteItem: (id: string) => Promise<boolean>
  // changeStatus: (id: string, newStatus: boolean, sendNotification: boolean) => Promise<boolean>
  // notificateUsers: (yearId: string) => Promise<boolean>
  fetch: (id: string) => Promise<void>
}

export const api = getEduProgram(axiosInstance);

export const useTeacherProgramsStore = create<TeacherProgramsStore>((set) => ({
  items: [],
  loading: false,

  fetch: async (id) => {
    set({ loading: true });
    try {

      const response = await api.getEduProgramYearsTeacherId(id)
      if (response.status == 200)
      {
        set({ items: response.data, loading: false });
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }
  },

  
  // addItem: async (newItem) => {
  //   try
  //   {
  //     const response = await api.postEduYear(newItem)
  //     if (response.status == 200)
  //     {
  //       set((state) => ({
  //         items: [...state.items, { ...newItem, id: response.data?.id, period: newItem.startYear != undefined ? `${newItem.startYear}-${newItem.startYear + 1}`: "-", }]
  //       }))
  //       ShowToast("Сохранено!", "", "success")
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


  // updateItem: async (id, updatedItem) => {
  //   try
  //   {
  //     const response = await api.putEduYear(updatedItem)
  //     if (response.status == 200)
  //     {
  //       set((state) => ({
  //       items: state.items.map(item => 
  //         item.id === id ? mergeUpdateToYear(item, updatedItem) : item
  //       )}))
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
  //   const request: DeleteEduYearParams = {
  //     guid: id
  //   }

  //   try
  //   {
  //     const response = await api.deleteEduYear(request)
  //     if (response.status == 200)
  //     {
  //       set((state) => ({
  //         items: state.items.filter(item => item.id !== id)
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

  // changeStatus: async (id, newStatus, sendNotification) => {
  //   const request: ChangeYearStatusRequest = {
  //     yearId: id,
  //     isOpenYear: newStatus,
  //     isNotificateUsers: sendNotification
  //   }

  //   try
  //   {
  //     const response = await api.patchEduYear(request)
  //     if (response.status == 200)
  //     {
  //       set((state) => ({
  //       items: state.items.map(item => 
  //         item.id === id ? {...item, isOpened: newStatus} : item
  //       )}))
  //       ShowToast("Изменено!", "", "success")
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

  // notificateUsers: async (yearId) => {
  //   const request: PostEduYearNotificationsParams = {
  //     yearId: yearId
  //   }

  //   try
  //   {
  //     const response = await api.postEduYearNotifications(request)
  //     if (response.status == 200)
  //     {
  //       ShowToast("Уведомлено!", "", "success")
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