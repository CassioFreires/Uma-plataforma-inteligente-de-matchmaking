import { Knex } from 'knex';
import { IUser } from '../interfaces/user/IUser.interface';
import { UpdateUserDto } from '../dto/User/update-user-dto';
import { CreateUserDto } from '../dto/User/create-user-dto';
import { IUserModel } from '../interfaces/user/user-model-interface';
import { configKnex } from '../../config/configKnex';

export class UserModel implements IUserModel {
  private db: Knex;

  constructor(knexInstance?: Knex) {
    this.db = knexInstance || configKnex;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const [user] = await this.db('users')
        .insert(createUserDto)
        .returning('*');  // retorna o registro inserido completo

      return user;
    } catch (error: any) {
      throw error;
    }
  }


  async getAll(): Promise<IUser[]> {
    try {
      return await this.db('users').select('*');
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<IUser> {
    try {
      return await this.db('users').where({ id }).first();
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IUser> {
    try {
      if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
        throw new Error('Dados para atualização não podem ser vazios');
      }
      await this.db('users').where({ id }).update(updateUserDto);
      const userUpdated = await this.db('users').where({ id }).first();
      return userUpdated;
    } catch (error) {
      throw error; // repassa para camadas superiores
    }
  }


  async delete(id: number): Promise<number> {
    try {
      return await this.db('users').where({ id }).del();
    }catch(error:any) {
      throw error;
    }
  }
}
