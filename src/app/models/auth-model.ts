import { AuthRegisterDto } from "../dto/auth/auth-register-dto";
import { configKnex } from "../../config/configKnex";
import { Knex } from "knex";
import { IRegisteredUser } from "../interfaces/auth/registeredUser-interface";
import { AuthLoginDto } from "../dto/auth/auth-login-dto";
import { ILoginResponse, IUserFromDb } from "../interfaces/auth/loginResponse-interface";

export default class AuthModel {
    private db: Knex;
    constructor(knexInstance?: Knex) {
        this.db = knexInstance || configKnex;
    }

    async register(authRegisterDto: AuthRegisterDto): Promise<IRegisteredUser> {
        try {
            const [user]: IRegisteredUser[] = await this.db('users')
                .insert(authRegisterDto)
                .returning('*');
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async login(authLoginDto: AuthLoginDto): Promise<IUserFromDb | undefined> {
        try {
            const user = await this.db('users')
                .select('id', 'name', 'lastname', 'email', 'password_hash')
                .where({
                    email: authLoginDto.email,
                })
                .first();

            return user;
        } catch (error) {
            throw error;
        }
    }
}