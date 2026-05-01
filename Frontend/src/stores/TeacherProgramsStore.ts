import type {EduProgramDTO, ShortYearDTO,  } from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getEduProgram } from '@/api/edu-program/edu-program';

interface TeacherProgramsStore {
  years: ShortYearDTO[]
  loading: boolean
  programs: Record<string, EduProgramDTO>
  fetch: (id: string) => Promise<void>
}

export const api = getEduProgram(axiosInstance);

export const useTeacherProgramsStore = create<TeacherProgramsStore>((set) => ({
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

}))