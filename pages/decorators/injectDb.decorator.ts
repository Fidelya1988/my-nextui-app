import { connectDb } from "../db/connectDb";
import { BaseModel, DB, ModelWithMethods, ModelDefinition } from "../db/db";
import { UserModel } from "../models/UserModel";



export function InjectDB(model: ModelDefinition) {
    return function <T extends { new(...args: any[]): {} }>(
        constructor: T
    ) {

        return class extends constructor {
            db?: DB
            protected async init() {
                this.db = await connectDb();
                console.log('DB connected to user');
            }
            public async getModel() {
                console.log(19, this.db)
              
                if (this.db) {
                    return this.db.createModel(model)
                }

            }
            constructor(...args: any[]) {
             
                super(...args);
                this.init()
                
                

             

            }
        };
    }
}