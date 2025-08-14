import AuthModel from "../../models/auth-model";
import { AuthRegisterDto } from "../../dto/auth/auth-register-dto";
import { AuthLoginDto } from "../../dto/auth/auth-login-dto";


const mockDb = jest.fn(() => ({
    insert: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValueOnce([
        {
            id: 1,
            name: 'Test',
            lastname: 'User',
            email: 'testuser@email.com',
            password_hash: '123456',
            created_at: new Date('2025-08-13'),
            updated_at: new Date('2025-08-13')
        }
    ]),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    first: jest.fn()
}));



// Função para criar o mock do Knex chainável
function createKnexMock() {
    const firstMock = jest.fn();
    const returningMock = jest.fn();
    const insertMock = jest.fn(() => ({ returning: returningMock }));
    const selectMock = jest.fn(() => ({ where: jest.fn(() => ({ first: firstMock })) }));

    const knexMock = jest.fn(() => ({
        insert: insertMock,
        returning: returningMock,
        select: selectMock,
        where: jest.fn(() => ({ first: firstMock })),
        first: firstMock
    }));

    return { knexMock, insertMock, returningMock, selectMock, firstMock };
}

describe('AuthModel', () => {
    let authModel: AuthModel;
    let knexMock: any;
    let returningMock: any;
    let firstMock: any;

    beforeEach(() => {
        const mocks = createKnexMock();
        knexMock = mocks.knexMock;
        returningMock = mocks.returningMock;
        firstMock = mocks.firstMock;

        authModel = new AuthModel(knexMock as any);
    });

    it('register - deve inserir um usuário no banco', async () => {
        const authRegisterDto: AuthRegisterDto = {
            name: 'Test',
            lastname: 'User',
            email: 'testuser@email.com',
            password_hash: '123456'
        };

        const insertedUser = { id: 1, ...authRegisterDto, created_at: new Date('2025-08-13'), updated_at: new Date('2025-08-13') };
        returningMock.mockResolvedValueOnce([insertedUser]);

        const result = await authModel.register(authRegisterDto);

        expect(result).toEqual(insertedUser);
        expect(returningMock).toHaveBeenCalledWith('*');
    });

    it('login - deve retornar usuário existente', async () => {
        const authLoginDto: AuthLoginDto = { email: 'testuser@email.com', password: '123456' };
        const userFromDb = { id: 1, name: 'Test', lastname: 'User', email: authLoginDto.email, password_hash: '123456' };
        firstMock.mockResolvedValueOnce(userFromDb);

        const result = await authModel.login(authLoginDto);

        expect(result).toEqual(userFromDb);
    });

    it('login - deve retornar undefined se usuário não existir', async () => {
        const authLoginDto: AuthLoginDto = { email: 'naoexiste@email.com', password: '123456' };
        firstMock.mockResolvedValueOnce(undefined);

        const result = await authModel.login(authLoginDto);

        expect(result).toBeUndefined();
    });
});
