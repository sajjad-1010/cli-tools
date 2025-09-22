import eventBus from "../utils/eventBus";
import chalk from "chalk";
import Table from "cli-table3";
import { Todo } from "../models/todo";

eventBus.on("todo:added", (todo) => {
  console.log(chalk.green(`✅ New todo added: ${JSON.stringify(todo, null, 2)}`));
});

eventBus.on("todo:list", (todos: Todo[]) => {
  const table = new Table({
    head: [
      chalk.blue("ID"),
      chalk.blue("Title"),
      chalk.blue("Status"),
      chalk.blue("Due Date"),
      chalk.blue("Created At"),
    ],
    colWidths: [5, 20, 12, 15, 25],
  });

  todos.forEach((todo) => {
    table.push([
      todo.id,
      todo.title,
      todo.completed ? chalk.green("✔ Done") : chalk.yellow("⚠ Pending"),//✘
      todo.dueDate || "-",
      todo.createdAt,
    ]);
  });

  console.log(table.toString());
});