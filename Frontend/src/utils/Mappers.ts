import { ProgramStatuses, type CreateProgramCommand, type EduProgramDTO, type EduYear, type GetUserDTO, type UpdateUserRequest, type UpdateYearRequest } from "@/api/models";

export const mapUpdateToUser = (
  item: GetUserDTO, 
  updates: UpdateUserRequest
): GetUserDTO => ({
  ...item,
  id: updates.userId ?? item.id,
  email: updates.email ?? item.email,
  role: updates.role ?? item.role,
  isActive: updates.isActive ?? item.isActive,
  initials: {
    surname: updates.surname ?? item.initials?.surname ?? '',
    name: updates.name ?? item.initials?.name ?? '',
    patronymic: updates.patronymic ?? item.initials?.patronymic ?? '',
    short: [
      updates.surname ?? item.initials?.surname ?? '',
      (updates.name ?? item.initials?.name ?? '').charAt(0),
      (updates.patronymic ?? item.initials?.patronymic ?? '').charAt(0)
    ].filter(Boolean).join(' ')
  }
});


export const mapUpdateToYear = (
  item: EduYear, 
  updates: UpdateYearRequest
): EduYear => ({
  ...item,
  id: updates.yearId ?? item.id,
  description: updates.description ?? item.description,
  startYear: updates.startYear ?? item.startYear,
  endYear: updates.startYear != undefined ? updates.startYear + 1 : 0,
  period: updates.startYear != undefined ? `${updates.startYear}-${updates.startYear + 1}`: "-",
  });


export const mapToEduProgramDTO = (command: CreateProgramCommand, id: string): EduProgramDTO => ({
  id: id,
  name: command.name || null,
  agesOfChildrens: command.agesOfChildrens || null,
  duration: command.duration || null,
  year: null,
  direction: null,
  directionId: command.directionId || undefined,
  teacher: null,
  programStatus: ProgramStatuses.Created,
  versions: []
});