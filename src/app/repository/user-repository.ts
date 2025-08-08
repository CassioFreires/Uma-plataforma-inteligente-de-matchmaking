import { IRepositoryResponse } from '../interfaces/user/IRepositoryResponse';
import { IUser } from '../interfaces/user/IUser.interface';
import { CreateUserDto } from '../dto/User/create-user-dto';
import { UpdateUserDto } from '../dto/User/update-user-dto';
import { UserModel } from '../models/user-model';
import { IUserModel } from '../interfaces/user/user-model-interface';

export default class UserRepository {
  private readonly userModel: IUserModel;

  constructor(userModel?: IUserModel) {
    this.userModel = userModel || new UserModel();
  }

  async create(createUserDto: CreateUserDto): Promise<IRepositoryResponse<IUser>> {
    try {
      const user = await this.userModel.create(createUserDto);
      return { data: user, success: true };
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<IRepositoryResponse<IUser[]>> {
    try {
      const users = await this.userModel.getAll();
      return { data: users, success: true };
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<IRepositoryResponse<IUser>> {
    try {
      const user = await this.userModel.getById(id);
      if (!user) {
        return { success: false, errors: 'Usuário não encontrado' };
      }
      return { data: user, success: true };
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<IRepositoryResponse<IUser>> {
    try {
      const userUpdated = await this.userModel.update(id, updateUserDto);
      if (!userUpdated) {
        return { success: false, errors: 'Usuário não encontrado para atualizar' };
      }
      return { success: true, data: userUpdated };
    } catch (error: any) {
      // Log do erro para debug, mas retorna objeto de erro
      return { success: false, errors: 'Erro ao atualizar usuário no banco' };
    }
  }

  async delete(id: number): Promise<IRepositoryResponse<null>> {
    try {
      const deletedCount = await this.userModel.delete(id);
      if (deletedCount === 0) {
        return { success: false, errors: 'Usuário não encontrado para deletar' };
      }
      return { success: true, data: null, message: 'Usuário deletado com sucesso' };
    } catch (error) {
      console.error('Erro ao deletar usuário no banco', error);
      return { errors: 'Erro ao deletar usuário no banco', success: false };
    }
  }
}
