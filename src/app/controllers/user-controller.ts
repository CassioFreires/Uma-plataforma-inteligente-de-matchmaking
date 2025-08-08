import { Request, Response } from 'express';
import UserService from '../services/user-service';
import { CreateUserDto } from '../dto/User/create-user-dto';
import { UpdateUserDto } from '../dto/User/update-user-dto';
import { IUserService } from '../interfaces/user/user-service.interface';

export default class UserController {
  private readonly userService: IUserService;

  constructor(userService?: IUserService) {
    this.userService = userService || new UserService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createUserDto: CreateUserDto = req.body;
      const result = await this.userService.create(createUserDto);

      if (result.errors) {
        return res.status(400).json({ success: false, message: result.errors });
      }

      return res.status(201).json({ success: true, data: result.data });
    } catch (error: any) {

      if (error.code === '23505' || error.constraint === 'users_email_key') {
        return res.status(409).json({ success: false, message: 'E-mail já cadastrado!' });
      }

      return res.status(500).json({ success: false, message: 'Erro interno ao criar usuário' });
    }
  }


  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.userService.getAll();

      if (result.errors) {
        return res.status(400).json({ success: false, message: result.errors || 'Nenhum usuário encontrado' });
      }

      return res.status(200).json({ success: true, data: result.data });
    } catch (error) {
      console.error('erro interno de servidor:');
      return res.status(500).json({ success: false, message: 'Erro interno ao buscar usuários' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const result = await this.userService.getById(id);
      if (result?.errors) {
        return res.status(400).json({ success: false, message: result?.errors || 'Usuário não encontrado através do ID' });
      }
      return res.status(200).json({ success: true, data: result?.data });
    } catch (error) {
      console.error('erro interno de servidor:', error);
      return res.status(500).json({ success: false, message: 'Erro interno ao buscar usuários' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const user: UpdateUserDto = req.body;
      if(!user.name && !user.lastname && !user.email && !user.password_hash) {
        return res.status(400).json({success:false, message: 'É necessário preencher pelo menos um campo'})
      }

      const result = await this.userService.update(id, user);

      if (result.errors) {
        return res.status(400).json({
          success: false,
          message: result.errors || 'Não foi possível atualizar o usuário',
        });
      }

      return res.status(200).json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      console.error('Erro interno de servidor:', error);
      return res.status(500).json({ success: false, message: 'Erro interno ao atualizar usuário' });
    }
  }


  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const result = await this.userService.delete(id);
      if (result.errors) {
        return res.status(400).json({ success: false, message: result.errors });
      }
      return res.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } catch (error) {
      console.error('erro interno de servidor:', error);
      return res.status(500).json({ success: false, message: 'Erro interno ao deletar usuário' });
    }
  }
}
