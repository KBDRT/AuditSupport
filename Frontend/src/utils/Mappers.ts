import type { EduYear, GetUserDTO, UpdateUserRequest, UpdateYearRequest } from "@/api/models";

export const mergeUpdateToUser = (
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


export const mergeUpdateToYear = (
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

