
import { IUser } from "./IUser.interface";
import { UpdateUserDto } from "../../dto/User/update-user-dto";
import { CreateUserDto } from "../../dto/User/create-user-dto";

export interface IUserModel {

    create(createUserDto: CreateUserDto): Promise<IUser>
    getAll(): Promise<IUser[]>
    getById(id: number): Promise<IUser>
    update(id: number, updateUserDto: UpdateUserDto): Promise<IUser>,
    delete(id: number): any
}