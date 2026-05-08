import { ProgramStatuses } from "@/api/models";
import { 
  MdInfo, 
  MdCheckCircle, 
  MdPending, 
  MdVerified, 
  MdEdit, 
  MdDone, 
  MdAssignment, 
  MdDelete, 
  MdWarning,
  MdHelp 
} from "react-icons/md";

export interface StatusConfig {
  label: string;
  colorPalette: string;
  icon: React.ComponentType;
}

export const GetStatusConfig = (status: ProgramStatuses): StatusConfig => {
  switch (status) {
    case ProgramStatuses.Created:
      return { 
        label: 'Создана', 
        colorPalette: 'gray',
        icon: MdInfo
      };
    case ProgramStatuses.ReadyToCheck:
      return { 
        label: 'Готова к проверке', 
        colorPalette: 'blue',
        icon: MdCheckCircle
      };
    case ProgramStatuses.Check:
      return { 
        label: 'На проверке', 
        colorPalette: 'yellow',
        icon: MdPending
      };
    case ProgramStatuses.Checked:
      return { 
        label: 'Проверена', 
        colorPalette: 'teal',
        icon: MdVerified
      };
    case ProgramStatuses.ReadyToChange:
      return { 
        label: 'На исправлении', 
        colorPalette: 'orange',
        icon: MdEdit
      };
    case ProgramStatuses.Changed:
      return { 
        label: 'Исправлена', 
        colorPalette: 'cyan',
        icon: MdDone
      };
    case ProgramStatuses.ReadyToApprove:
      return { 
        label: 'На подписании', 
        colorPalette: 'purple',
        icon: MdAssignment
      };
    case ProgramStatuses.Deleted:
      return { 
        label: 'Удалена', 
        colorPalette: 'gray',
        icon: MdDelete
      };
    case ProgramStatuses.Approved:
      return { 
        label: 'Подписана', 
        colorPalette: 'green',
        icon: MdVerified
      };
    case ProgramStatuses.NeedChanges:
      return { 
        label: 'Нужно исправление', 
        colorPalette: 'red',
        icon: MdWarning
      };
    default:
      return { 
        label: 'Неизвестно', 
        colorPalette: 'gray',
        icon: MdHelp
      };
  }
};

export const GetStatusTypeName = (status: ProgramStatuses): string => {
  return GetStatusConfig(status).label;
};