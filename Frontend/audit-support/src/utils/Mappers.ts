import type { GetUserDTO, UpdateUserRequest } from "@/api/models";

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