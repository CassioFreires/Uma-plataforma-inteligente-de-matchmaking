import { AuthLoginDto } from "../../dto/auth/auth-login-dto";
import { AuthRegisterDto } from "../../dto/auth/auth-register-dto";
import AuthService from "../../services/auth-service";
import IAuthRepository from "../../interfaces/auth/auth-repository-interface";
import { IUserFromDb } from "../../interfaces/auth/loginResponse-interface";
import { IRegisteredUser } from "../../interfaces/auth/registeredUser-interface";

jest.mock('../../utils/bcrypts', () => ({
    generateCryptPassword: jest.fn(() => ({ password_hash: '123456' })),
    compareCryptPassword: jest.fn(() => Promise.resolve(true))
}));

class AuthRepositoryMocks implements IAuthRepository {
    register(authRegisterDto: AuthRegisterDto): Promise<IRegisteredUser> {
        return Promise.resolve({
            id: 1,
            name: authRegisterDto.name,
            lastname: authRegisterDto.lastname,
            email: authRegisterDto.email,
            password_hash: authRegisterDto.password_hash,
            created_at: new Date('2025-08-13'),
            updated_at: new Date('2025-08-13')
        });
    }

    login(authLoginDto: AuthLoginDto): Promise<IUserFromDb | undefined> {
        return Promise.resolve({
            id: 1,
            name: 'repo',
            lastname: 'repository',
            email: 'repository@email.com',
            password_hash: '123456'
        });
    }
}

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        const authRepositoryMocks = new AuthRepositoryMocks();
        authService = new AuthService(authRepositoryMocks);
    });

    it('register - deve registrar um usuário com sucesso', async () => {
        const authRegisterDto: AuthRegisterDto = {
            name: 'Auth',
            lastname: 'Auth Service',
            email: 'authservice@email.com',
            password_hash: '123456'
        };

        const result = await authService.register(authRegisterDto);

        expect(result).toMatchObject({
            name: 'auth', // lowercase conforme service
            lastname: 'auth service',
            email: 'authservice@email.com',
            password_hash: '123456'
        });

        expect(result.id).toBe(1);
    });

    it('login - deve autenticar o usuário com sucesso', async () => {
        const authLoginDto: AuthLoginDto = {
            email: 'repository@email.com',
            password: '123456'
        };

        const result = await authService.login(authLoginDto);

        expect(result).toMatchObject({
            user: {
                id: 1,
                name: 'repo',
                lastname: 'repository',
                email: 'repository@email.com'
            },
            token: expect.any(String)
        });
    });

});
