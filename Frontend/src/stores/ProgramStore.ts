import type {CreateVersionRequest, EduProgramDTO, ProgramVersionDTO, UpdateProgramCommand,  } from '@/api/models';
import { create } from 'zustand';
import { axiosInstance } from '@/services/axiosInstanse';
import { ShowError, ShowToast } from '@/components/common/Alert';
import { AxiosError } from 'axios'
import { getEduProgram } from '@/api/edu-program/edu-program';
import { type ChangeProgramStatusCommand } from './../api/models/changeProgramStatusCommand';

interface ProgramStore {
  selectedVersion: ProgramVersionDTO | null
  loading: boolean
  program: EduProgramDTO | null
  fetchProgram: (programId: string) => Promise<boolean>
  updateProgram: (updatedProgram: UpdateProgramCommand) => Promise<boolean>
  addVersion: (item: Omit<CreateVersionRequest, 'id'>) => Promise<boolean>
  downloadVersionFile: (versionId: string) => Promise<boolean> // 
  setSelectedVersion: (version: ProgramVersionDTO) => void
  changeStatus: (request: ChangeProgramStatusCommand) => Promise<boolean> // 
  deleteProgram: (programId: string) => Promise<boolean>
}

export const api = getEduProgram(axiosInstance);

export const useProgramStore = create<ProgramStore>((set) => ({
  loading: false,
  selectedVersion: null,
  program: {},

  setSelectedVersion: (version) => {   set({ selectedVersion: version });},

  changeStatus: async (request) => {
    set({ loading: true });
    try {

      const response = await api.patchEduProgramStatus(request)
      if (response.status == 200)
      {

        return true;
      }
    }
    catch (error)
    {
      ShowError(error as AxiosError)
    }

    return false;
  },

  fetchProgram: async (id) => {
    try 
    {
      const response = await api.getEduProgramProgramId(id)
      if (response.status == 200) 
      {
        set({ program: response.data });
        return true;
      } 
    }
    catch (error) 
    {
      ShowError(error as AxiosError)
      return false;
    }
    return false
  },
  
  addVersion: async (item) => {
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
          isSuccessCheck: response.data.isSuccessCheck,
          techCheckId: response.data.techCheckId
        }

        set((state) => ({
        program: {
          ...state.program,
          versions: [
            ...(state.program?.versions || []),
            newVersion
          ]
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

  
  deleteProgram: async (programId) => {
    try 
    {
      const response = await api.deleteEduProgram({programId: programId})
      if (response.status == 200) 
      {
        return true;
      } 
    }
    catch (error) 
    {
      ShowError(error as AxiosError)
      return false;
    }
    return false
  },

  downloadVersionFile: async (versionId) => {
    try {

      const response = await api.getEduProgramVersionFileVersionId(versionId, 
      {
        responseType: 'blob'  
      })
      if (response.status == 200)
      {
         const blob = new Blob([response.data], { 
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        })

        const fileNameBase64 = response.headers['x-file-name']
        let filename = 'Программа.docx'

        if (fileNameBase64) {
          filename = decodeURIComponent(escape(atob(fileNameBase64)))
        }

        const url = window.URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename) 
        
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
          program: {
            ...state.program,
            [updatedProgram.programId || ""]: {
              ...state.program,
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

}))