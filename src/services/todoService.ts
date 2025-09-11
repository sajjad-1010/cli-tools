// src/services/todoService.ts
import { Todo, NewTodo } from "../models/todo";
import { db, initDB } from "./todoStorage";

export async function addTodo(data: NewTodo): Promise<Todo> {
  await initDB();
  const newTodo: Todo = {
    id: db.data!.todos.length + 1,
    title: data.title,
    completed: false,
    dueDate: data.dueDate,
    createdAt: new Date().toISOString(),
  };
  db.data!.todos.push(newTodo);
  await db.write();
  return newTodo;
}

export async function listTodos(): Promise<Todo[]> {
  await initDB();
  return db.data!.todos;
}

export async function completeTodo(id: number): Promise<Todo | null> {
  await initDB();
  const todo = db.data!.todos.find(t => t.id === id);
  if (!todo) return null;
  todo.completed = true;
  await db.write();
  return todo;
}

export async function editTodo(id: number, updates: Partial<NewTodo>): Promise<Todo | null> {
  await initDB();
  const todo = db.data!.todos.find(t => t.id === id);
  if (!todo) return null;

  if (updates.title) todo.title = updates.title;
  if (updates.dueDate) todo.dueDate = updates.dueDate;

  await db.write();
  return todo;
}

export async function removeTodo(id: number): Promise<boolean> {
  await initDB();
  const index = db.data!.todos.findIndex(t => t.id === id);
  if (index === -1) return false;

  db.data!.todos.splice(index, 1);
  await db.write();
  return true;
}
