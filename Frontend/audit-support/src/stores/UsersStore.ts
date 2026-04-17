import type { CreateUserRequest, DeleteAdminUsersParams, Direction, GetAdminUsersParams, GetUserDTO, UpdateUserRequest } from '@/api/models';
import { create } from 'zustand';
import { getAdmin } from '@/api/admin/admin';
import { mergeUpdateToUser } from '@/utils/Mappers';
import { axiosInstance } from '@/services/axiosInstanse';
import { showToast } from '@/components/common/Alert';

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
  addItem: (item: Omit<CreateUserRequest, 'id'>) => void
  updateItem: (id: string, item: Partial<UpdateUserRequest>) => void
  deleteItem: (id: string) => void
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
      if (response.data != null)
      {
        set({ items: response.data, allItems: response.data, loading: false });
        get().useFilter()
      }
    } catch (error) {
      console.error('Error:', error);
      set({ loading: false });
    }
  },

  addItem: (newItem) => set((state) => ({
    items: [...state.items, { ...newItem, id: Date.now().toString() }]
  })),
  
  updateItem: async (id, updatedItem) => {
    const response = await adminApi.patchAdminUsers(updatedItem)

    if (response.status == 200)
    {
      set((state) => ({
      allItems: state.allItems.map(item => 
        item.id === id ? mergeUpdateToUser(item, updatedItem) : item
      )}))
      get().filterUsers({ statusCode: "all", searchField: "", roles: [] })
      showToast("Обновлено!", "", "success")
    }
  },
  
  deleteItem: async (id) => {
    const request: DeleteAdminUsersParams = {
      userId: id
    }

    const response = await adminApi.deleteAdminUsers(request)
    if (response.status == 200)
    {
      set((state) => ({
        items: state.items.filter(item => item.id !== id),
        allitems: state.allItems.filter(item2 => item2.id !== id)
      }))
      showToast("Удалено!", "", "success")
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
    await adminApi.postAdminUsersPasswordUserId(userId);
  },


}))