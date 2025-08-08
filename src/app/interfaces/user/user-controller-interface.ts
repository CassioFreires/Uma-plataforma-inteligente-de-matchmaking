import { CreateUserDto } from "../../dto/User/create-user-dto";
import { UpdateUserDto } from "../../dto/User/update-user-dto";
import { IUser } from "./IUser.interface";
import { IControllerResponse } from "./IControllerResponse";

export interface IUserController {
    create(create:CreateUserDto): IControllerResponse<IUser>;
    getAll(): IControllerResponse<IUser[]>;
    getById(id: number): IControllerResponse<IUser> | undefined;
    update(id: number, updateUser: UpdateUserDto): IControllerResponse<IUser>;
    delete(id: number): string;
}