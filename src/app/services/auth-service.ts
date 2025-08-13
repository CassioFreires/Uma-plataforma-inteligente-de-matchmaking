import { AuthRegisterDto } from "../dto/auth/auth-register-dto";
import { IRegisteredUser } from "../interfaces/auth/registeredUser-interface";
import AuthRepository from "../repository/auth-repository";
import IAuthRepository from "../interfaces/auth/auth-repository-interface";
import { ILoginResponse } from "../interfaces/auth/loginResponse-interface";
import { AuthLoginDto } from "../dto/auth/auth-login-dto";
import { generateCryptPassword, compareCryptPassword } from "../utils/bcrypts";
import { IUserFromDb } from "../interfaces/auth/loginResponse-interface";

export default class AuthService {

    private readonly authRepository: IAuthRepository;

    constructor(authRepository?: IAuthRepository) {
        this.authRepository = authRepository || new AuthRepository();
    }

    async register(authRegisterDto: AuthRegisterDto): Promise<IRegisteredUser> {
        try {

            const userToInsert: AuthRegisterDto = {
                name: authRegisterDto.name.toLocaleLowerCase(),
                lastname: authRegisterDto.lastname.toLocaleLowerCase(),
                email: authRegisterDto.email.toLocaleLowerCase(),
                ...generateCryptPassword(authRegisterDto.password_hash, Number(process.env.BCRYPT_SALT))
            };

            return this.authRepository.register(userToInsert);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async login(authLoginDto: AuthLoginDto): Promise<ILoginResponse> {
        const authUser = await this.authRepository.login(authLoginDto);

        if (!authUser) {
            throw new Error('Usuário ou senha inválidos');
        }

        const passwordIsValid = await compareCryptPassword(
            authLoginDto.password,
            authUser.password_hash
        );

        if (!passwordIsValid) {
            throw new Error('Usuário ou senha inválidos');
        }

        const token = "gerar_token_jwt_aqui";

        return {
            token,
            user: {
                id: authUser.id,
                name: authUser.name,
                lastname: authUser.lastname,
                email: authUser.email
            }
        };
    }

}