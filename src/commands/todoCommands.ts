import { Command } from "commander";
import { db, initDB } from "../services/todoStorage";
import { Todo } from "../models/todo";

export function registerTodoCommands(program: Command) {

  const newId = db.data!.todos.length > 0 
  ? Math.max(...db.data!.todos.map(t => Number(t.id))) + 1 
  : 1;

  program
    .command("add <title>")
    .description("Add a new todo")
    .option("-d, --dueDate <dueDate>", "Due date for the todo (YYYY-MM-DD)")
    .action(async (title, options) => {
      await initDB();

      const newTodo: Todo = {
        id: newId,
        title,
        completed: false,
        dueDate: options.dueDate || undefined,
        createdAt: new Date().toISOString(),
      };
      db.data!.todos.push(newTodo);
      await db.write();
      console.log("✅ Todo added:", newTodo);
    });

  program
    .command("list")
    .description("List all todos")
    .action(async () => {
      await initDB();

      const todos = db.data!.todos;
      if (todos.length === 0) {
        console.log("📭 No todos yet!");
      } else {
        console.log("📋 Todos:");
        todos.forEach((todo) => {
          console.log(
            `- [${todo.completed ? "x" : " "}] ${todo.title} (id: ${todo.id}) ${
              todo.dueDate ? "due: " + todo.dueDate : ""
            }`
          );
        });
      }
    });

  program
    .command("complete <id>")
    .description("Mark a todo as completed")
    .action(async (id) => {
      await initDB();

      const todoId = Number(id); 
      const todo = db.data!.todos.find((t) => t.id === todoId);
      if (!todo) {
        console.log("❌ Todo not found");
        return;
      }
      todo.completed = true;
      await db.write();
      console.log("✅ Todo marked as complete:", todo);
    });

  program
    .command("remove <id>")
    .description("Remove a todo by id")
    .action(async (id) => {
      await initDB();

      const todoId = Number(id);
      const index = db.data!.todos.findIndex((t) => t.id === todoId);
      if (index === -1) {
        console.log("❌ Todo not found");
        return;
      }
      const removed = db.data!.todos.splice(index, 1);
      await db.write();
      console.log("🗑️ Todo removed:", removed[0]);
    });

  program
    .command("edit <id> <newTitle>")
    .description("Edit the title of a todo")
    .option("-d, --dueDate <dueDate>", "New due date")
    .action(async (id, newTitle, options) => {
      await initDB();
      
      const todoId = Number(id);
      const todo = db.data!.todos.find((t) => t.id === todoId);
      if (!todo) {
        console.log("❌ Todo not found");
        return;
      }
      todo.title = newTitle;
      if (options.dueDate) {
        todo.dueDate = options.dueDate;
      }
      await db.write();
      console.log("✏️ Todo updated:", todo);
    });
}
