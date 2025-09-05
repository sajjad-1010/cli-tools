import { Command } from "commander";
import { addTodo } from "../services/todoService";

const addCommand = new Command("add")
  .description("Add a new todo")
  .argument("<title>", "Title of the todo")
  .option("--due <date>", "Due date of the todo (YYYY-MM-DD)")
  .action((title: string, options: { due?: string }) => {
    addTodo(title, options.due);
  });

export default addCommand;
