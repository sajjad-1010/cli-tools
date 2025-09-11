import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import { Todo } from "../models/todo"

type Data = {
  todos: Todo[]
}

const adapter = new JSONFile<Data>("db.json")

const db = new Low<Data>(adapter, { todos: [] })

export async function initDB() {
  await db.read()
  db.data ||= { todos: [] }
  await db.write()
  return db
}

export { db };
