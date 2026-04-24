import type { Roles } from "@/api/models";

const GetRoleName = (role: Roles) => {
    switch (role) {
      case 0: return 'Педагог';
      case 1: return 'Методист';
      case 2: return 'Зам. директора';
      case 3: return 'Администратор';
      default: return 'Не указано';
    }
}

export default GetRoleName