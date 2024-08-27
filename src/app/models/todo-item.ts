export interface TodoItem {
  id: number;
  content: string;
  status: TODOITEM_STATUS;
}

export enum TODOITEM_STATUS {
  OPEN,
  STARTED,
  PAUSED,
  DONE,
}
