// src/services/todoService.ts
import { Todo, NewTodo } from "../models/todo";
import Database from "../services/todoStorage";
import eventBus from "../utils/eventBus";

export async function addTodo(data: NewTodo): Promise<Todo> {
  
  const db = await Database.getInstance();
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
  
  const db = await Database.getInstance();
  return db.data!.todos;
}

export async function completeTodo(id: number): Promise<Todo | null> {
  
  const db = await Database.getInstance();
  const todo = db.data!.todos.find(t => t.id === id);
  if (!todo) return null;
  todo.completed = true;
  await db.write();
  return todo;
}

export async function editTodo(id: number, updates: Partial<NewTodo>): Promise<Todo | null> {
  
  const db = await Database.getInstance();
  const todo = db.data!.todos.find(t => t.id === id);
  if (!todo) return null;

  if (updates.title) todo.title = updates.title;
  if (updates.dueDate) todo.dueDate = updates.dueDate;

  await db.write();
  return todo;
}

export async function removeTodo(id: number): Promise<boolean> {
  
  const db = await Database.getInstance();
  const index = db.data!.todos.findIndex(t => t.id === id);
  if (index === -1) return false;

  db.data!.todos.splice(index, 1);
  await db.write();
  return true;
}
