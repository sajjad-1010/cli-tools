#!/usr/bin/env node
import "./subscribers/todoSubscribers";
import { Command } from "commander";
import { registerTodoCommands } from "./commands/todoCommands";

const program = new Command();

program
  .name("todo-cli")
  .description("A simple CLI tool to manage your todos")
  .version("1.0.0");

registerTodoCommands(program);

program.parse(process.argv);
