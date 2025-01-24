import { DB } from "./db";
import { UserModel } from "../models/UserModel";

export const connectDb = async () => {
   const db = new DB([UserModel]);
   db.init()
   return db
}

connectDb() 