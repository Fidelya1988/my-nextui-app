import { UUIDTypes } from "uuid"
import { ROLE } from "../types/roles.type"
import { DTO } from "../db/db"
import { UserModel } from "../models/UserModel"

export type UserDto = DTO <typeof UserModel>