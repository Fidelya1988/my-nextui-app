import path from "path";
import { DB } from "./db";
import { UserModel } from "../models/UserModel";

export const connectDb = async () => {
   const dbPath = path.join(process.cwd(), 'pages', 'db', 'db.json');
   const db = new DB(dbPath, [UserModel]);
   db.init()
   return db
}

connectDb()