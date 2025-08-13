import { IRegisteredUser } from "./registeredUser-interface";
import { AuthRegisterDto } from "../../dto/auth/auth-register-dto";
import { AuthLoginDto } from "../../dto/auth/auth-login-dto";
import { ILoginResponse, IUserFromDb } from "./loginResponse-interface";

export default interface IAuthModel {
    register(authRegisterDto: AuthRegisterDto): Promise<IRegisteredUser>;
    login(authLoginDto: AuthLoginDto):Promise<IUserFromDb | undefined>;
}