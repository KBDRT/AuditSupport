import type { Roles, RuleSectionType } from "@/api/models";

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

