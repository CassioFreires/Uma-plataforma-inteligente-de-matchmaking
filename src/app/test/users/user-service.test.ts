import { CreateUserDto } from "../../dto/User/create-user-dto";
import { UpdateUserDto } from "../../dto/User/update-user-dto";
import { IRepositoryResponse } from "../../interfaces/user/IRepositoryResponse";
import { IUser } from "../../interfaces/user/IUser.interface";
import { IUserRepository } from "../../interfaces/user/user-repository.interface";
import UserService from "../../services/user-service";

class UserRepositoryMock implements IUserRepository {
  async create(createUserDto: CreateUserDto): Promise<IRepositoryResponse<IUser>> {
    if (!createUserDto.name || !createUserDto.lastname || !createUserDto.password_hash) {
      return { success: false, message: "É necessário preencher todos os campos" };
    }
    if (createUserDto.email === "erro@example.com") {
      return { success: false, message: "Erro ao criar usuário" };
    }
    return {
      success: true,
      data: {
        name: createUserDto.name,
        lastname: createUserDto.lastname,
        email: createUserDto.email || "mock@example.com",
        password_hash: createUserDto.password_hash,
      },
      message: "Usuário criado mockado com sucesso",
    };
  }

  async getAll(): Promise<IRepositoryResponse<IUser[]>> {
    return {
      success: true,
      data: [
        { name: "João", lastname: "Silva", email: "joao@example.com", password_hash: "hash123" },
        { name: "Maria", lastname: "Souza", email: "maria@example.com", password_hash: "hash456" },
      ],
      message: "Lista mockada de usuários",
    };
  }

  async getById(id: number): Promise<IRepositoryResponse<IUser>> {
    if (id === 999) {
      return { success: false, message: "Usuário não encontrado" };
    }
    return {
      success: true,
      data: { name: "João", lastname: "Silva", email: "joao@example.com", password_hash: "hash123" },
      message: `Usuário mockado com id ${id}`,
    };
  }

  async update(id: number, user: UpdateUserDto): Promise<IRepositoryResponse<IUser>> {
    if (id === 999) {
      return { success: false, message: "Usuário não encontrado para atualização" };
    }
    return {
      success: true,
      data: {
        name: user.name || "João",
        lastname: user.lastname || "Silva",
        email: user.email || "joao@example.com",
        password_hash: user.password_hash || "hash123",
      },
      message: `Usuário mockado atualizado com id ${id}`,
    };
  }

  async delete(id: number): Promise<IRepositoryResponse<null>> {
    if (id === 999) {
      return { success: false, message: "Usuário não encontrado para exclusão" };
    }
    return {
      success: true,
      data: null,
      message: `Usuário mockado deletado com id ${id}`,
    };
  }
}

describe('UserService', () => {
  let userRepositoryMock: jest.Mocked<IUserRepository>;
  let userService: UserService;

  beforeEach(() => {
    // Criando um mock do UserRepository
    userRepositoryMock = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    // Passando o mock para o Service
    userService = new UserService(userRepositoryMock);
  });

  describe('create', () => {
    it('deve retornar erro se campos obrigatórios estiverem faltando', async () => {
      const dto: CreateUserDto = { name: '', lastname: '', password_hash: '' } as any;

      const result = await userService.create(dto);

      expect(result.success).toBe(false);
      expect(result.message).toBe('É necessário preencher todos os campos');
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });

    it('deve criar usuário com sucesso', async () => {
      const dto: CreateUserDto = { name: 'John', lastname: 'Doe', email: "john@email.com", password_hash: 'hash123' };
      userRepositoryMock.create.mockResolvedValue({
        success: true,
        data: { id: 1, ...dto },
      });

      const result = await userService.create(dto);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ id: 1, ...dto });
      expect(userRepositoryMock.create).toHaveBeenCalledWith(dto);
    });

    it('deve retornar erro do repositório', async () => {
      const dto: CreateUserDto = { name: 'John', lastname: 'Doe',email: "john@email.com", password_hash: 'hash123' };
      userRepositoryMock.create.mockResolvedValue({
        success: false,
        message: 'Erro ao criar usuário',
      });

      const result = await userService.create(dto);

      expect(result.success).toBe(false);
      expect(result.errors).toBe('Erro ao criar usuário');
    });
  });

  describe('getAll', () => {
    it('deve retornar todos os usuários', async () => {
      const mockUsers = [{ id: 1, name: 'John', lastname: 'Doe', email: "john@email.com", password_hash: 'hash' }];
      userRepositoryMock.getAll.mockResolvedValue({
        success: true,
        data: mockUsers,
      });

      const result = await userService.getAll();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUsers);
    });

    it('deve retornar erro se não encontrar usuários', async () => {
      userRepositoryMock.getAll.mockResolvedValue({ success: false, message: 'Nenhum usuário encontrado' });

      const result = await userService.getAll();

      expect(result.success).toBe(false);
      expect(result.errors).toBe('Nenhum usuário encontrado');
    });
  });

  describe('getById', () => {
    it('deve retornar usuário pelo ID', async () => {
      const mockUser = { id: 1, name: 'John', lastname: 'Doe', email: "john@email.com", password_hash: 'hash' };
      userRepositoryMock.getById.mockResolvedValue({ success: true, data: mockUser });

      const result = await userService.getById(1);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
    });

    it('deve retornar erro se usuário não for encontrado', async () => {
      userRepositoryMock.getById.mockResolvedValue({ success: false, message: 'Usuário não encontrado' });

      const result = await userService.getById(99);

      expect(result.success).toBe(false);
      expect(result.errors).toBe('Usuário não encontrado');
    });
  });

  describe('update', () => {
    it('deve atualizar usuário com sucesso', async () => {
      const dto: UpdateUserDto = { name: 'John Updated' };
      userRepositoryMock.update.mockResolvedValue({
        success: true,
        data: { id: 1, name: 'John Updated', lastname: 'Doe', email: "john@email.com", password_hash: 'hash' },
      });

      const result = await userService.update(1, dto);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('John Updated');
    });

    it('deve retornar erro do repositório ao atualizar', async () => {
      const dto: UpdateUserDto = { name: 'John Updated' };
      userRepositoryMock.update.mockResolvedValue({ success: false, errors: 'Erro ao atualizar' });

      const result = await userService.update(1, dto);

      expect(result.success).toBe(false);
      expect(result.errors).toBe('Erro ao atualizar');
    });
  });

  describe('delete', () => {
    it('deve deletar usuário com sucesso', async () => {
      userRepositoryMock.delete.mockResolvedValue({
        success: true,
        data: null,
        message: 'Usuário deletado com sucesso',
      });

      const result = await userService.delete(1);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Usuário deletado com sucesso');
    });

    it('deve retornar erro do repositório ao deletar', async () => {
      userRepositoryMock.delete.mockResolvedValue({ success: false, errors: 'Erro ao deletar' });

      const result = await userService.delete(1);

      expect(result.success).toBe(false);
      expect(result.errors).toBe('Erro ao deletar');
    });
  });
});