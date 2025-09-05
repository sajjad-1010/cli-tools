import { Command } from "commander";
import addCommand from "./commands/add";

const program = new Command();

program
  .name("todo")
  .description("A simple CLI for managing your todos")
  .version("0.1.0");

program.addCommand(addCommand);

program.parse(process.argv);
