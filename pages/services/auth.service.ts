import { hashPassword } from "../utils/hashPassword"
import { UserDto } from "../dto/user.dto"
import "reflect-metadata";
import { DB } from "../db/db";
import { connectDb } from "../db/connectDb";
import { InjectDB } from "../decorators/injectDb.decorator";
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from "../models/UserModel";


function LogAndModify(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    // Замінюємо оригінальний метод новою функцією
    descriptor.value = async function (...args: any[]) {
        console.log(`Метод "${propertyKey}" викликано з аргументами:`, args);

        // Викликаємо оригінальний метод з переданими аргументами
        const result = await originalMethod.apply(this, args);

        console.log(`Метод "${propertyKey}" повернув результат:`, result);
        return result;
    };

    return descriptor;
}



@InjectDB(UserModel)
export class AuthService {
    public db?: DB
    constructor( ) {
      

    }
    public async getModel () {
        return this.db?.createModel(UserModel)
    }
    public async hashPassword(password: string) {

        return hashPassword(password)

    }
    @LogAndModify
    public async signUp(user: UserDto) {
        console.log(33, this)
        const hashedPassword = await this.hashPassword(user.password as unknown as string)
        const id = uuidv4()
        const model =  await this.getModel()
        const existedUser = await model?.findOne({email: user.email})
        if(existedUser) {
            throw new Error('409', {cause: 'Already exist'})
        }

        const payload = {...user, id, password: hashedPassword}
       await model?.create(payload)
       return payload
      

   
    }

    public async login ({email, password}: {email: string, password: string}) {
        const model  = await this.getModel();
        const data = await model?.findOne({email})
        if (!data) {
            throw new Error('401', {cause: 'User does not exist'})
            
        }
        const hashedPassword =  await hashPassword(password);
         if( data.password !== hashedPassword) {
            throw new Error('401', {cause: 'Wrong password'})
         }

        return data

    }

}

export default new AuthService()