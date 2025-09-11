import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import { Todo } from "../models/todo"

type Data = {
  todos: Todo[]
}
class Database {
  private static instance: Low<Data>;
  
  private constructor() {} 

  public static async getInstance() {
    if (!Database.instance) {
      const adapter = new JSONFile<Data>("db.json");
      Database.instance = new Low<Data>(adapter, { todos: [] });

      await Database.instance.read();
      Database.instance.data ||= { todos: [] };
    }
    return Database.instance;
  }
}

export default Database;

