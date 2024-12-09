import { BaseModel, ModelDefinition } from "../db/db";
import { UUIDTypes } from "uuid";
import { ROLE } from "../types/roles.type";


export const UserModel: ModelDefinition = {
    name: 'user',
    fields: {
        id: 'string',
        name: 'string',
        email: 'string',
        role: 'string',
        password: 'string'
        
    },

}

