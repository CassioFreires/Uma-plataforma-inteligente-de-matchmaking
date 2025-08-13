import { Request, Response } from "express";
import { AuthRegisterDto } from "../dto/auth/auth-register-dto";
import AuthService from "../services/auth-service";
import IAuthService from "../interfaces/auth/auth-service-interface";
import { AuthLoginDto } from "../dto/auth/auth-login-dto";
import { sendSuccess, sendError } from "../utils/response-helper";

export default class AuthController {
    private readonly authService: IAuthService;
    constructor(authService?: IAuthService) {
        this.authService = authService || new AuthService()
    }

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const authRegisterDto: AuthRegisterDto = req.body;

            if (!authRegisterDto.email || !authRegisterDto.lastname || !authRegisterDto.name || !authRegisterDto.password_hash) {
                return sendError(res, 'É necessário preencher todos os campos!', 400);
            }

            const user = await this.authService.register(authRegisterDto as Required<AuthRegisterDto>);

            return sendSuccess(res, user, 'Usuário criado com sucesso', 201);
        } catch (error: any) {
            if (error.code === '23505' || error.constraint === 'users_email_key') {
                return sendError(res, 'E-mail já cadastrado!', 409);
            }

            return sendError(res, 'Erro interno ao criar usuário', 500);
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const authLoginDto: AuthLoginDto = req.body;

            if (!authLoginDto.email || !authLoginDto.password) {
                return sendError(res, 'Preencha e-mail e senha', 400);
            }

            const result = await this.authService.login(authLoginDto);

            return sendSuccess(res, result, 'Usuário autenticado', 200); // retorna token e dados do usuário
        } catch (error: any) {
            console.error(error.message);

            if (error.message === 'Usuário ou senha inválidos') {
                return sendError(res, error.message, 401); // credenciais inválidas
            }

            return sendError(res, 'Erro interno ao tentar logar usuário', 500); // erro inesperado
        }
    }
}