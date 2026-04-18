import type { CreateUserRequest, DeleteAdminUsersParams, GetAdminUsersParams, GetUserDTO, UpdateUserRequest } from '@/api/models';
import { create } from 'zustand';
import { getAdmin } from '@/api/admin/admin';
import { mergeUpdateToUser } from '@/utils/Mappers';
import { axiosInstance } from '@/services/axiosInstanse';
import { showToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import type { ErrorsApi } from '@/types/ErrorsApi';

interface FilterUsers
{
  statusCode: string,
  searchField: string | undefined,
  roles: string[]
}

interface UsersStore {
  items: GetUserDTO[]
  allItems: GetUserDTO[]
  loading: boolean
  filter: FilterUsers
  addItem: (item: Omit<CreateUserRequest, 'id'>) => Promise<boolean>
  updateItem: (id: string, item: Partial<UpdateUserRequest>) => Promise<boolean>
  deleteItem: (id: string) => Promise<boolean>
  getItem: (id: string) => GetUserDTO | undefined
  fetchUsers: () => Promise<void>
  useFilter: () => void
  clearFiler: () => void
  filterUsers: (newFilter: Partial<FilterUsers>) => void 
  resetPassword: (userId: string) => void
}

export const adminApi = getAdmin(axiosInstance);

export const useUsersStore = create<UsersStore>((set, get) => ({
  items: [],
  allItems: [],
  loading: false,
  filter: {
    roles: [],
    statusCode: "active",
    searchField: undefined
  },
  
  fetchUsers: async () => {
    set({ loading: true });
    try {

      const params : GetAdminUsersParams  = {
        Page : 1,
        Size : 10000
      }

      const response = await adminApi.getAdminUsers(params)
      if (response.status == 200)
      {
        set({ items: response.data, allItems: response.data, loading: false });
        get().useFilter()
      }
    }
    catch (error)
    {
      const err = error as AxiosError
      const errors = err.response?.data as ErrorsApi
      showToast("Произошла ошибка!", `${errors.message}`, "error")
    }
  },

  
  addItem: async (newItem) => {
    try
    {
      const response = await adminApi.postAdminUsers(newItem)

      console.log(response)
      if (response.status == 200)
      {
        set((state) => ({
          allItems: [...state.allItems, { ...newItem, id: response.data?.userId }]
        }))
        get().filterUsers({ statusCode: "all", searchField: "", roles: [] })
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
      showToast("Произошла ошибка!", `${errors.message}`, "error")
      return false
    }
  },


  updateItem: async (id, updatedItem) => {
    try
    {
      const response = await adminApi.patchAdminUsers(updatedItem)

      if (response.status == 200)
      {
        set((state) => ({
        allItems: state.allItems.map(item => 
          item.id === id ? mergeUpdateToUser(item, updatedItem) : item
        )}))
        get().filterUsers({ statusCode: "all", searchField: "", roles: [] })
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
      showToast("Произошла ошибка!", `${errors.message}`, "error")
      return false
    }
  },
  
  deleteItem: async (id) => {
    const request: DeleteAdminUsersParams = {
      userId: id
    }

    try
    {
      const response = await adminApi.deleteAdminUsers(request)
      if (response.status == 200)
      {
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
          allitems: state.allItems.filter(item2 => item2.id !== id)
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
      showToast("Произошла ошибка!", `${errors.message}`, "error")
      return false
    }
  },
  
  getItem: (id) => get().items.find(item => item.id === id),

  useFilter: () => {
    const { allItems, filter } = get()
    
    let filtered = [...allItems]
    
    if (filter.statusCode === "active") {
      filtered = filtered.filter(user => user.isActive === true)
    } else if (filter.statusCode === "inactive") {
      filtered = filtered.filter(user => user.isActive === false)
    }
    
    if (filter.searchField && filter.searchField.trim() && filter.searchField.length > 0) {
      const search = filter.searchField.toLowerCase().trim()
      filtered = filtered.filter(user => 
        user.login?.toLowerCase().startsWith(search) ||
        user.initials?.short?.toLowerCase().startsWith(search)
      )
    }
    
    if (filter.roles && filter.roles.length > 0) {
      filtered = filtered.filter(user => 
        filter.roles.includes(user.role?.toString() ?? "")
      )
    }
    
    set({ items: filtered })
  },

  clearFiler: () => {set((state) => ({
    filter: {   roles: [], statusCode: "active", searchField: undefined }}))
    get().useFilter()
  },

  filterUsers: (newFilter) => {set((state) => ({
    filter: { ...state.filter, ...newFilter }}))
    get().useFilter()
  },

  resetPassword: async(userId) => {
    try
    {
      const response = await adminApi.postAdminUsersPasswordUserId(userId);
      if (response.status == 200)
      {
        showToast("Отправлено!", "", "success")
      }
      else
      {
        showToast("Внимание!", `${response?.data}`, "warning")
      }
    }
    catch (error)
    {
      const err = error as AxiosError
      const errors = err.response?.data as ErrorsApi
      showToast("Произошла ошибка!", `${errors.message}`, "error")
    }
  },


}))