import { CreateUserDto } from "../../dto/User/create-user-dto";
import { UpdateUserDto } from "../../dto/User/update-user-dto";
import { IServiceResponse } from "../../interfaces/user/IServiceResponse";
import { IUser } from "../../interfaces/user/IUser.interface";
import { IUserService } from "../../interfaces/user/user-service.interface";
import { createRequest, createResponse } from "node-mocks-http";
import UserController from "../../controllers/user-controller";

class UserServiceMock implements IUserService {
  async create(createUserDto: CreateUserDto): Promise<IServiceResponse<IUser>> {
    return Promise.resolve({
      success: true,
      data: {
        name: createUserDto.name,
        lastname: createUserDto.lastname,
        email: createUserDto.email,
        password_hash: createUserDto.password_hash,
      },
      message: "Usuário criado com sucesso",
    });
  }

  async getAll(): Promise<IServiceResponse<IUser[]>> {
    return Promise.resolve({
      success: true,
      data: [
        {
          name: "João",
          lastname: "Silva",
          email: "joao@example.com",
          password_hash: "hash123",
        },
        {
          name: "Maria",
          lastname: "Souza",
          email: "maria@example.com",
          password_hash: "hash456",
        },
      ],
      message: "Lista de usuários retornada",
    });
  }

  async getById(id: number): Promise<IServiceResponse<IUser>> {
    return Promise.resolve({
      success: true,
      data: {
        name: "João",
        lastname: "Silva",
        email: "joao@example.com",
        password_hash: "hash123",
      },
      message: `Usuário com id ${id} encontrado`,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IServiceResponse<IUser>> {
    return Promise.resolve({
      success: true,
      data: {
        name: updateUserDto.name || "João",
        lastname: updateUserDto.lastname || "Silva",
        email: updateUserDto.email || "joao@example.com",
        password_hash: updateUserDto.password_hash || "hash123",
      },
      message: `Usuário com id ${id} atualizado`,
    });
  }
  async delete(id: number): Promise<IServiceResponse<null>> {
    return Promise.resolve({
      success: true,
      data: null,
      message: `Usuário com id ${id} deletado`,
    });
  }
}

describe("UserController", () => {
  let userController: UserController;

  beforeEach(() => {
    const userServiceMock = new UserServiceMock();
    userController = new UserController(userServiceMock);
  });

  // Testes positivos

  test("create - deve criar usuário com sucesso", async () => {
    const req = createRequest({
      method: "POST",
      url: "/users",
      body: {
        name: "Cássio",
        lastname: "Souza",
        email: "cassio@example.com",
        password_hash: "123456",
      } as CreateUserDto,
    });
    const res = createResponse();

    await userController.create(req, res);

    expect(res.statusCode).toBe(201);
    const data = res._getJSONData();
    expect(data.success).toBe(true);
    expect(data.data).toMatchObject({
      name: "Cássio",
      lastname: "Souza",
      email: "cassio@example.com",
      password_hash: "123456",
    });
  });

  test("getAll - deve retornar lista de usuários", async () => {
    const req = createRequest({ method: "GET", url: "/users" });
    const res = createResponse();

    await userController.getAll(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
  });

  test("getById - deve retornar usuário pelo id", async () => {
    const req = createRequest({ method: "GET", url: "/users/1", params: { id: "1" } });
    const res = createResponse();

    await userController.getById(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty("email");
  });

  test("update - deve atualizar usuário com sucesso", async () => {
    const req = createRequest({
      method: "PUT",
      url: "/users/1",
      params: { id: "1" },
      body: { name: "Novo Nome" },
    });
    const res = createResponse();

    await userController.update(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.success).toBe(true);
    expect(data.data.name).toBe("Novo Nome");
  });

  test("delete - deve deletar usuário com sucesso", async () => {
    const req = createRequest({
      method: "DELETE",
      url: "/users/1",
      params: { id: "1" },
    });
    const res = createResponse();

    await userController.delete(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.success).toBe(true);
    expect(data.data).toBeNull();
  });

  // Testes negativos e de erro

  test("create - retorna 400 se service retornar errors", async () => {
    const req = createRequest({
      method: "POST",
      url: "/users",
      body: {
        name: "Cássio",
        lastname: "Souza",
        email: "cassio@example.com",
        password_hash: "123456",
      } as CreateUserDto,
    });
    const res = createResponse();

    jest.spyOn(userController["userService"], "create").mockResolvedValueOnce({
      success: false,
      errors: "Dados inválidos",
      message: "Erro na validação",
    });

    await userController.create(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.success).toBe(false);
    expect(data.message).toBe("Dados inválidos");
  });

  test("create - retorna 409 se email duplicado (exceção lançada)", async () => {
    const req = createRequest({
      method: "POST",
      url: "/users",
      body: {
        name: "Cássio",
        lastname: "Souza",
        email: "cassio@example.com",
        password_hash: "123456",
      },
    });
    const res = createResponse();

    jest.spyOn(userController["userService"], "create").mockImplementationOnce(() => {
      throw { code: "23505", constraint: "users_email_key" };
    });

    await userController.create(req, res);

    expect(res.statusCode).toBe(409);
    const data = res._getJSONData();
    expect(data.success).toBe(false);
    expect(data.message).toBe("E-mail já cadastrado!");
  });

  test("update - retorna 400 se não passar campos para atualizar", async () => {
    const req = createRequest({
      method: "PUT",
      url: "/users/1",
      params: { id: "1" },
      body: {},
    });
    const res = createResponse();

    await userController.update(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.success).toBe(false);
    expect(data.message).toBe("É necessário preencher pelo menos um campo");
  });

  test("getById - retorna 400 se service retornar errors", async () => {
    const req = createRequest({
      method: "GET",
      url: "/users/999",
      params: { id: "999" },
    });
    const res = createResponse();

    jest.spyOn(userController["userService"], "getById").mockResolvedValueOnce({
      success: false,
      errors: "Usuário não encontrado",
      message: "Erro ao buscar usuário",
    });

    await userController.getById(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.success).toBe(false);
    expect(data.message).toBe("Usuário não encontrado");
  });
});
