import { AuthRegisterDto } from "../dto/auth/auth-register-dto";
import AuthModel from "../models/auth-model";
import { IRegisteredUser } from "../interfaces/auth/registeredUser-interface";
import IAuthModel from "../interfaces/auth/auth-model-interface";
import { AuthLoginDto } from "../dto/auth/auth-login-dto";
import { IUserFromDb } from "../interfaces/auth/loginResponse-interface";

export default class AuthRepository {

    private readonly authModel: IAuthModel;

    constructor(authModel?: IAuthModel) {
        this.authModel = authModel || new AuthModel();
    }

    async register(authRegisterDto: AuthRegisterDto): Promise<IRegisteredUser> {
        try {
            return this.authModel.register(authRegisterDto);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async login(authLoginDto: AuthLoginDto):Promise<IUserFromDb | undefined> {
        try {
            return this.authModel.login(authLoginDto)
        } catch (error) {
            throw error;
        }
    }
}