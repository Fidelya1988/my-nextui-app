import { hashPassword } from "../utils/hashPassword"
import { UserDto } from "../dto/user.dto"
import "reflect-metadata";
import { DB } from "../db/db";
import { InjectDB } from "../decorators/injectDb.decorator";
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from "../models/UserModel";
import dotenv from 'dotenv';
import { comparePassword } from "../utils/comparePasswords";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenActions";


dotenv.config()



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
    public async signUp(user: UserDto) {
        const hashedPassword = await this.hashPassword(user.password as unknown as string)
        const model =  await this.getModel()
        const existedUser = await model?.findOne({email: user.email})
        if(existedUser) {
            throw new Error('409', {cause: 'Already exist'})
        }

        const payload = {...user, password: hashedPassword}
      const result = await model?.create(payload)
       return result
      

   
    }

    public async login ({email, password}: {email: string, password: string}) {
        const model  = await this.getModel();
        const user = await model?.findOne({email})
        if (!user) {
            throw new Error('401', {cause: 'User does not exist'})
            
        }
        const hashedPassword =  await hashPassword(password);
        const isMatch = comparePassword(password, hashedPassword as string);
         if(!isMatch) {
            throw new Error('401', {cause: 'Wrong password'})
         }
       
          const accessToken =  generateAccessToken(user.id);
          const refreshToken = generateRefreshToken(user.id)
        return {user: {id: user.id, name: user.name, email: user.email, role: user.role}, accessToken, refreshToken}

    }

}

export default new AuthService()