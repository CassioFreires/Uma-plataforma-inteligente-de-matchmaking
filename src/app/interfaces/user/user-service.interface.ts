import { CreateUserDto } from "../../dto/User/create-user-dto";
import { UpdateUserDto } from "../../dto/User/update-user-dto";
import { IUser } from "./IUser.interface";
import { IServiceResponse } from "./IServiceResponse";

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<IServiceResponse<IUser>>;
  getAll(): Promise<IServiceResponse<IUser[]>>;
  getById(id: number): Promise<IServiceResponse<IUser>>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<IServiceResponse<IUser>>;
  delete(id: number): Promise<IServiceResponse<null>>;
}
