import { AuthRegisterDto } from "../../dto/auth/auth-register-dto";
import { IRegisteredUser } from "../../interfaces/auth/registeredUser-interface";
import { AuthLoginDto } from "../../dto/auth/auth-login-dto";
import { IUserFromDb } from "../../interfaces/auth/loginResponse-interface";
import AuthRepository from "../../repository/auth-repository";
import IAuthModel from "../../interfaces/auth/auth-model-interface";

class AuthModelMock implements IAuthModel {
    register = jest.fn((authRegisterDto: AuthRegisterDto): Promise<IRegisteredUser> => {
        return Promise.resolve({
            id: 1,
            name: authRegisterDto.name,
            lastname: authRegisterDto.lastname,
            email: authRegisterDto.email,
            password_hash: authRegisterDto.password_hash,
            created_at: new Date('2025-08-13'),
            updated_at: new Date('2025-08-13')
        });
    });

    login = jest.fn((authLoginDto: AuthLoginDto): Promise<IUserFromDb | undefined> => {
        if (authLoginDto.email === 'repo@email.com') {
            return Promise.resolve({
                id: 1,
                name: 'repo',
                lastname: 'repository',
                email: authLoginDto.email,
                password_hash: '123456'
            });
        }
        return Promise.resolve(undefined);
    });
}

describe('AuthRepository', () => {
    let authRepository: AuthRepository;
    let authModelMock: AuthModelMock;

    beforeEach(() => {
        authModelMock = new AuthModelMock();
        authRepository = new AuthRepository(authModelMock as any); // typecast para bypass
    });

    it('register - deve registrar um usuário corretamente', async () => {
        const authRegisterDto: AuthRegisterDto = {
            name: 'Auth',
            lastname: 'Repository',
            email: 'authrepo@email.com',
            password_hash: '123456'
        };

        const result = await authRepository.register(authRegisterDto);

        expect(result).toMatchObject({
            name: 'Auth',
            lastname: 'Repository',
            email: 'authrepo@email.com',
            password_hash: '123456'
        });

        expect(result.id).toBe(1);
        expect(authModelMock.register).toHaveBeenCalledTimes(1);
    });

    it('login - deve retornar usuário existente', async () => {
        const authLoginDto: AuthLoginDto = {
            email: 'repo@email.com',
            password: '123456'
        };

        const result = await authRepository.login(authLoginDto);

        expect(result).toMatchObject({
            id: 1,
            name: 'repo',
            lastname: 'repository',
            email: 'repo@email.com',
            password_hash: '123456'
        });

        expect(authModelMock.login).toHaveBeenCalledTimes(1);
    });

    it('login - deve retornar undefined se usuário não existir', async () => {
        const authLoginDto: AuthLoginDto = {
            email: 'naoexiste@email.com',
            password: '123456'
        };

        const result = await authRepository.login(authLoginDto);

        expect(result).toBeUndefined();
        expect(authModelMock.login).toHaveBeenCalledTimes(1);
    });
});
