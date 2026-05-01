import type { ProgramStatuses, Roles, RuleSectionType } from "@/api/models";

export const GetRoleName = (role: Roles) => {
    switch (role) {
      case 0: return 'Педагог';
      case 1: return 'Методист';
      case 2: return 'Зам. директора';
      case 3: return 'Администратор';
      default: return 'Не указано';
    }
}

export const GetSectionTypeName = (ruleType: RuleSectionType) => {
    switch (ruleType) {
      case 0: return 'Текстовый';
      case 1: return 'Табличный';
      case 2: return 'Строки';
      default: return 'Не указано';
    }
}


export const GetStatusTypeName = (status: ProgramStatuses) => {
    switch (status) {
      case 0: return 'Создана';
      case 1: return 'Готова к проверке';
      case 2: return 'Проверяется';
      case 3: return 'Проверена';
      case 4: return 'На исправлении';
      case 5: return 'Исправлена';
      case 6: return 'Готова к подписанию';
      case 7: return 'Удалена';
      case 8: return 'Подписана';
      default: return 'Неизвестно';
    }
}


export const FormatDateTime = (isoDate: string): string => {
    const date = new Date(isoDate)
    
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    
    return `${day}.${month}.${year} ${hours}:${minutes}`
}
