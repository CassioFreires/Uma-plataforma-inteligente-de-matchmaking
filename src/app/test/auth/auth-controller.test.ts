import { createRequest, createResponse } from "node-mocks-http";
import AuthController from "../../controllers/auth-controller";
import { AuthLoginDto } from "../../dto/auth/auth-login-dto";
import { AuthRegisterDto } from "../../dto/auth/auth-register-dto";
import IAuthService from "../../interfaces/auth/auth-service-interface";
import { ILoginResponse } from "../../interfaces/auth/loginResponse-interface";
import { IRegisteredUser } from "../../interfaces/auth/registeredUser-interface";

// Classe mock para simular o AuthService, removendo a dependência do banco de dados nos testes.
class AuthServiceMocks implements IAuthService {
    register(authRegisterDto: AuthRegisterDto): Promise<IRegisteredUser> {
        const user: IRegisteredUser = {
            id: 1,
            name: authRegisterDto.name,
            lastname: authRegisterDto.lastname,
            email: authRegisterDto.email,
            password_hash: authRegisterDto.password_hash,
            created_at: new Date('2025-08-13'),
            updated_at: new Date('2025-08-13')
        }
        return Promise.resolve(user)
    }

    login(authLoginDto: AuthLoginDto): Promise<ILoginResponse> {
        return Promise.resolve({
            token: 'seu-token-aqui',
            user: {
                id: 1,
                name: 'Cleiton',
                lastname: 'Lima',
                email: 'cleiton@email.com',
            }
        })
    }
}





describe('AuthController', () => {

    let authController: AuthController;

    beforeEach(() => {
        const authServiceMocks = new AuthServiceMocks();
        authController = new AuthController(authServiceMocks)
    })

    test('register - deve registrar um novo usuário com sucesso', async () => {
        const req = createRequest({
            method: 'POST',
            url: 'auth/register',
            body: {
                name: 'Cleiton',
                lastname: 'Lima',
                email: 'cleiton@email.com',
                password_hash: '123456'
            } as AuthRegisterDto
        });

        const res = createResponse();

        await authController.register(req, res);

        const responseBody = res._getJSONData();

        expect(res.statusCode).toBe(201);

        expect(responseBody.data).toMatchObject({
            name: 'Cleiton',
            lastname: 'Lima',
            email: 'cleiton@email.com',
            password_hash: '123456'
        });

        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Usuário criado com sucesso');

    });


    test('login - deve autenticar o usuário', async () => {
        const req = createRequest({
            method: 'POST',
            url: 'auth/login',
            body: {
                email: 'cleiton@email.com',
                password: '123456'
            }

        });

        const res = createResponse();

        await authController.login(req, res);

        const responseBody = res._getJSONData();
        expect(res.statusCode).toBe(200); // <-- status 200 conforme controller

        expect(responseBody.data).toMatchObject({
            token: 'seu-token-aqui',
            user: {
                id: 1,
                name: 'Cleiton',
                lastname: 'Lima',
                email: 'cleiton@email.com'
            }
        });

        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Usuário autenticado');


    })
});