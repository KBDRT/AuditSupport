import { getAuth } from '@/api/auth/auth';
import type { LoginUserRequest } from '@/api/models';
import { axiosInstance } from '@/services/axiosInstanse';
import { create } from 'zustand';
import type { User } from '@/types/User';
import { persist } from 'zustand/middleware';
import { ShowError, ShowToast } from '@/components/common/Alert';
import type { AxiosError } from 'axios';

interface AuthStore {
  loading: boolean
  user: User | null
  login: (login: string, password: string) => Promise<boolean>
  logout: () => Promise<boolean>
  checkAuth: () => Promise<boolean>
}

export const api = getAuth(axiosInstance);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      loading: false,
      user: null,

      login: async (login, password) => {
        set({ loading: true });
        try {
          const params: LoginUserRequest = { login, password };
          const response = await api.postAuthLogin(params);

          if (response.status == 200) {
            const userData = { 
              role: response.data.role ?? "", 
              userId: response.data.userId ?? "",
              userName: response.data.userName ?? "",
              login: response.data.login ?? ""
            };
            set({ user: userData, loading: false });
            ShowToast("Успешно!", "", "success")
            return true;
          }
        } catch (error) {
          ShowError(error as AxiosError)
          set({ loading: false });
        }
        return false;
      },

      logout: async () => {
        set({ loading: true });
        try {
          const response = await api.postAuthLogout();
          if (response.status == 200) {
            set({ user: null, loading: false });
            return true;
          }
        } catch (error) {
          ShowError(error as AxiosError)
        } finally {
          set({ user: null, loading: false });
        }
        return false;
      },

      checkAuth: async () => {
        set({ loading: true });
        try {
          const response = await api.getAuthCheckAuth();
          if (response.status == 200) {
            const userData = { 
              role: response.data.role ?? "", 
              userId: response.data.userId ?? "",
              userName: response.data.userName ?? "",
              login: response.data.login ?? ""
            };
            set({ user: userData, loading: false });
            return true;
          }
        } catch (error) {
          ShowError(error as AxiosError)
          set({ user: null });
        } finally {
          set({ loading: false });
        }
        return false;
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);