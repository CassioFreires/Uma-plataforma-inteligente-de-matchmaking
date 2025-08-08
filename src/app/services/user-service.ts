import UserRepository from '../repository/user-repository';
import { IUser } from '../interfaces/user/IUser.interface';
import { CreateUserDto } from '../dto/User/create-user-dto';
import { IServiceResponse } from '../interfaces/user/IServiceResponse';
import { UpdateUserDto } from '../dto/User/update-user-dto';
import { IUserRepository } from '../interfaces/user/user-repository.interface';


export default class UserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository?: IUserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async create(createUserDto: CreateUserDto): Promise<IServiceResponse<IUser>> {
    if (!createUserDto.name || !createUserDto.lastname || !createUserDto.password_hash) {
      return { success: false, message: 'É necessário preencher todos os campos' };
    }
    try {
      const repoResponse = await this.userRepository.create(createUserDto);
      if (!repoResponse.success) {
        return { success: false, errors: repoResponse.errors || repoResponse.message || 'Erro desconhecido' };
      }
      return { success: true, data: repoResponse.data };
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<IServiceResponse<IUser[]>> {
    try {
      const result = await this.userRepository.getAll();
      if (!result.success || result.data?.length === 0 || !result.data) {
        return { success: false, errors: result.errors || result.message || 'Nenhum usuário encontrado' };
      }
      return { success: true, data: result.data };
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<IServiceResponse<IUser>> {
    try {
      const result = await this.userRepository.getById(id);
      if (!result?.data) {
        return { success: false, errors: result?.errors || result?.message }
      }
      if (!result?.success) {
        return { success: false, errors: result?.errors || result?.message };
      }
      return { success: true, data: result.data };
    } catch (error) {
      console.error('error interno de servidor' + error);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IServiceResponse<IUser>> {
    try {
      const updateUser = await this.userRepository.update(id, updateUserDto);
      if (updateUser.errors) {
        return {
          success: false,
          errors: updateUser.errors || 'Erro desconhecido ao tentar atualizar usuário',
        };
      }
      return { success: true, data: updateUser.data };
    } catch (error) {
      console.error('Erro no serviço ao atualizar usuário:', error);
      return {
        success: false,
        errors: 'Erro interno de servidor ao tentar atualizar usuário',
      };
    }
  }

  async delete(id: number): Promise<IServiceResponse<null>> {
    try {
      const remove = await this.userRepository.delete(id);
      if (remove.errors) {
        return { success: false, errors: remove.errors || remove.message || 'Erro desconhecido ao tentar deletar usuário' };
      }
      return { success: true, data: remove.data, message: remove.message };
    } catch (error) {
      console.error('Error interno de servidor ao tentar deletar usuário');
      return { success: false, errors: 'Error interno de servidor ao tentar deletar usuário' };
    }
  }
}
