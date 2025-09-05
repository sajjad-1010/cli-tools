export interface Todo {
  id: string;
  title: string;
  due?: string;
  completed: boolean;
  createdAt: string;
}

let todos: Todo[] = [];

export function addTodo(title: string, due?: string) {
  const todo: Todo = {
    id: Date.now().toString(),
    title,
    due,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);
  console.log("✅ Todo added:", todo);
}
