export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}