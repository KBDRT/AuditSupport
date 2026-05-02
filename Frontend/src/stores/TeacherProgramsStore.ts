import {ProgramStatuses, type CreateProgramCommand, type EduProgramDTO, type ShortYearDTO,  } from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getEduProgram } from '@/api/edu-program/edu-program';


interface TeacherProgramsStore {
  years: ShortYearDTO[]
  loading: boolean
  programs: EduProgramDTO[]
  addProgram: (newProgram: CreateProgramCommand) => Promise<boolean>
  fetch: (id: string) => Promise<void>
}

export const api = getEduProgram(axiosInstance);

export const useTeacherProgramsStore = create<TeacherProgramsStore>((set) => ({
  years: [],
  loading: false,
  programs: [],

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

  addProgram: async (newProgram) => {
    try {
      const response = await api.postEduProgram(newProgram)
      if (response.status == 200)
      {
   
        set((state) => ({
          years: state.years.map(year => 
            year.id === newProgram.yearId 
              ? {
                  ...year,
                  programs: [
                    {id: response.data.id, name: newProgram.name, status: ProgramStatuses.Created},
                    ...(year.programs || [])
                  ]
                }
              : year
          )
        }))

        ShowToast("Сохранено!", "", "success")
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }
    return true
  },

}))

