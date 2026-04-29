import type {CreateVersionRequest, EduProgramDTO, ProgramVersionDTO, ShortYearDTO, UpdateProgramCommand,  } from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getEduProgram } from '@/api/edu-program/edu-program';

interface TeacherProgramsStore {
  years: ShortYearDTO[]
  loading: boolean
  programs: Record<string, EduProgramDTO>
  fetchProgram: (programId: string) => Promise<boolean>
  getProgram: (programId: string) => EduProgramDTO
  updateProgram: (updatedProgram: UpdateProgramCommand) => Promise<boolean>
  addVersion: (item: Omit<CreateVersionRequest, 'id'>) => Promise<boolean>
  downloadVersionFile: (versionId: string) => Promise<boolean>
  fetch: (id: string) => Promise<void>
}

export const api = getEduProgram(axiosInstance);

export const useTeacherProgramsStore = create<TeacherProgramsStore>((set, get) => ({
  years: [],
  loading: false,
  programs: {},

  fetch: async (id) => {
    set({ loading: true });
    try {

      const response = await api.getEduProgramYearsTeacherId(id)
      if (response.status == 200)
      {
        set({ years: response.data, loading: false });
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }
  },

  fetchProgram: async (id) => {
    try 
    {
      const response = await api.getEduProgramProgramId(id)
      if (response.status === 200) {
        set((state) => ({
          programs: {
            ...state.programs,
            [id]: response.data  
          }
        }))}
      return true;
    } 
    catch (error) 
    {
      ShowError(error as AxiosError)
      return false;
    }
  },
  

  getProgram: (programId) => {
    return get().programs[programId]
  },

  
  addVersion: async (item) => {
    const id = item.programId || ""
    try {
      if (!item || item.programId == undefined) {
        ShowToast("Ошибка", "programId не передан", "error")
        return false
      }

      const response = await api.postEduProgramVersion(item, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.status === 200) {
        const newVersion: ProgramVersionDTO = {
          id: response.data.id,
          changes: item.changes,
          // fileSize: response.data?.fileSize,
          createdDate: new Date().toISOString(),
        }

        set((state) => ({
          programs: {
            ...state.programs,
            [id]: {
              ...state.programs[id],
              versions: [
                ...(state.programs[id]?.versions || []),
                newVersion
              ]
            }
          }
        }))
        
        ShowToast("Сохранено!", "", "success")
        return true
      }
      return false
    } catch (error) {
      ShowError(error as AxiosError)
      return false
    }
  },


  downloadVersionFile: async (versionId) => {
    try {

      const response = await api.getEduProgramVersionFileVersionId(versionId, 
      {
        responseType: 'blob'  
      })
      if (response.status == 200)
      {
        // console.log(response.data)
         const blob = new Blob([response.data], { 
          //  type: 'application/pdf' 
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        })

        const url = window.URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'example.docx') 
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        window.URL.revokeObjectURL(url)
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }

    return true
  },

 updateProgram: async (updatedProgram: UpdateProgramCommand): Promise<boolean> => {
  try {
    const response = await api.patchEduProgram(updatedProgram)
    if (response.status === 200) {

      if (updatedProgram.programId != undefined)
      {
        set((state) => ({
          programs: {
            ...state.programs,
            [updatedProgram.programId || ""]: {
              ...state.programs[updatedProgram.programId || ""],
              ...updatedProgram 
            }
          }
        }))
      }
      ShowToast("Обновлено!", "", "success")
      return true;
    }
  } catch (error) {
    ShowError(error as AxiosError)
  }
  return false;
},

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