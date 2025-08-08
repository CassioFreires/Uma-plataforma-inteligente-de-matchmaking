
import { IRepositoryResponse } from './IRepositoryResponse';
import { IUser } from './IUser.interface';
import { CreateUserDto } from '../../dto/User/create-user-dto';
import { UpdateUserDto } from '../../dto/User/update-user-dto';

export interface IUserRepository {
  create(user: CreateUserDto): Promise<IRepositoryResponse<IUser>>;
  getAll(): Promise<IRepositoryResponse<IUser[]>>;
  getById(id: number): Promise<IRepositoryResponse<IUser> | undefined>;
  update(id: number, user: UpdateUserDto): Promise<IRepositoryResponse<IUser>>;
  delete(id: number): Promise<IRepositoryResponse<null>>;
}
