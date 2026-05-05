import type { CreateUserRequest, DeleteAdminUsersParams, EduProgramDTO, EduYear, GetAdminUsersParams, GetProgramsWithFilterQuery, GetUserDTO, UpdateUserRequest } from '@/api/models';
import { create } from 'zustand';
import { getAdmin } from '@/api/admin/admin';
import { mapUpdateToUser } from '@/utils/Mappers';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import type { EduProgramShortDTO } from '@/api/models/eduProgramShortDTO';
import { getEduProgram } from '@/api/edu-program/edu-program';

interface FilterUsers
{
  statusCode: string,
  searchField: string | undefined,
  roles: string[]
}

interface ProgramsStore {
  items: EduProgramShortDTO[]
  allItems: EduProgramShortDTO[]
  loading: boolean
  filter: FilterUsers
  yearId: string,
  setYear: (newYearId: string) => void 

  addItem: (item: Omit<CreateUserRequest, 'id'>) => Promise<boolean>
  updateItem: (id: string, item: Partial<UpdateUserRequest>) => Promise<boolean>
  deleteItem: (id: string) => Promise<boolean>
  getItem: (id: string) => GetUserDTO | undefined
  fetch: () => Promise<void>
  useFilter: () => void
  clearFiler: () => void
}

export const api = getEduProgram(axiosInstance);

export const useProgramsStore = create<ProgramsStore>((set, get) => ({
  items: [],
  allItems: [],
  loading: false,
  yearId: "",

  setYear: (newYearId) => set({ yearId: newYearId }),
  
  filter: {
    roles: [],
    statusCode: "active",
    searchField: undefined
  },
  
  fetch: async () => {

    if (!get().yearId || get().yearId.length == 0)
    {
      set({ items: [] });
      return;
    }

    set({ loading: true });
    try {

      const params : GetProgramsWithFilterQuery  = {
       yearId: get().yearId
      }

      const response = await api.getEduProgram(params)
      if (response.status == 200)
      {
        set({ items: response.data, allItems: response.data, loading: false });
        get().useFilter()
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }
  },

  
  addItem: async (newItem) => {
    return false
    // try
    // {
    //   const response = await adminApi.postAdminUsers(newItem)
    //   if (response.status == 200)
    //   {
    //     // set((state) => ({
    //     //   allItems: [...state.allItems, { ...newItem, id: response.data?.userId, isActive: true, initials: {surname: newItem.surname, name: newItem.name, patronymic: newItem.surname} }]
    //     // }))
    //     get().filterUsers({ statusCode: "all", searchField: "", roles: [] })
    //     ShowToast("Сохранено!", "", "success")
    //     return true
    //   }
    //   else
    //   {
    //     ShowToast("Внимание!", `${response?.data}`, "warning")
    //     return false
    //   }
    // }
    // catch (error)
    // {
    //   ShowError(error as AxiosError)
    //   return false
    // }
  },


  updateItem: async (id, updatedItem) => {
    return false
    // try
    // {
    //   const response = await adminApi.patchAdminUsers(updatedItem)

    //   if (response.status == 200)
    //   {
    //     // set((state) => ({
    //     // allItems: state.allItems.map(item => 
    //     //   item.id === id ? mapUpdateToUser(item, updatedItem) : item
    //     // )}))
    //     get().filterUsers({ statusCode: "all", searchField: "", roles: [] })
    //     ShowToast("Обновлено!", "", "success")
    //     return true
    //   }
    //   else
    //   {
    //     ShowToast("Внимание!", `${response?.data}`, "warning")
    //     return false
    //   }
    // }
    // catch (error)
    // {
    //   ShowError(error as AxiosError)
    //   return false
    // }
  },
  
  deleteItem: async (id) => {
    return false
    // const request: DeleteAdminUsersParams = {
    //   userId: id
    // }

    // try
    // {
    //   const response = await adminApi.deleteAdminUsers(request)
    //   if (response.status == 200)
    //   {
    //     set((state) => ({
    //       items: state.items.filter(item => item.id !== id),
    //       allItems: state.allItems.filter(item => item.id !== id)
    //     }))
    //     ShowToast("Удалено!", "", "success")
    //     return true
    //   }
    //   else
    //   {
    //     ShowToast("Внимание!", `${response?.data}`, "warning")
    //     return false
    //   }
    // }
    // catch (error)
    // {
    //   ShowError(error as AxiosError)
    //   return false
    // }
  },
  
  getItem: (id) => get().items.find(item => item.id === id),

  useFilter: () => {
    const { allItems, filter } = get()
    
    let filtered = [...allItems]

    // if (filter.statusCode === "active") {
    //   filtered = filtered.filter(user => user.isActive === true)
    // } else if (filter.statusCode === "inactive") {
    //   filtered = filtered.filter(user => user.isActive === false)
    // }
    
    // if (filter.searchField && filter.searchField.trim() && filter.searchField.length > 0) {
    //   const search = filter.searchField.toLowerCase().trim()
    //   filtered = filtered.filter(user => 
    //     user.login?.toLowerCase().startsWith(search) ||
    //     user.initials?.short?.toLowerCase().startsWith(search)
    //   )
    // }
    
    // if (filter.roles && filter.roles.length > 0) {
    //   filtered = filtered.filter(user => 
    //     filter.roles.includes(user.role?.toString() ?? "")
    //   )
    // }
    
    set({ items: filtered })
  },

  clearFiler: () => {set(() => ({
    filter: {   roles: [], statusCode: "active", searchField: undefined }}))
    get().useFilter()
  },



}))