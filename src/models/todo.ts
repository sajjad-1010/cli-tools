export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

export type NewTodo = Omit<Todo, "id" | "createdAt" | "completed">;
