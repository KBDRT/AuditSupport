import type { HistorySourceType } from "./historySourceType";
import type { ProgramStatuses } from "./programStatuses";

export interface ProgramHistoryDTO {
  userid: string;
  userFIO: string;
  programId: string;
  date: string;
  oldStatus: ProgramStatuses;
  newStatus: ProgramStatuses;
  sourceId: string;
  sourceType: HistorySourceType;
}

