import { AuthLoginDto } from "../../dto/auth/auth-login-dto"
import { AuthRegisterDto } from "../../dto/auth/auth-register-dto"
import { ILoginResponse } from "./loginResponse-interface"
import { IRegisteredUser } from "./registeredUser-interface"

export default interface IAuthService {
    register(authRegisterDto:AuthRegisterDto): Promise<IRegisteredUser>,
    login(authLoginDto:AuthLoginDto): Promise<ILoginResponse>
}