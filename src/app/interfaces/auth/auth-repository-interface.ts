import { AuthLoginDto } from "../../dto/auth/auth-login-dto";
import { AuthRegisterDto } from "../../dto/auth/auth-register-dto";
import { ILoginResponse, IUserFromDb } from "./loginResponse-interface";
import { IRegisteredUser } from "./registeredUser-interface";

export default interface IAuthRepository {
    register(authRegisterDto:AuthRegisterDto): Promise<IRegisteredUser>,
    login(authLoginDto: AuthLoginDto): Promise<IUserFromDb | undefined>
}