// Define o formato do usuário que será retornado após o registro.
// O id e a data de criação são adicionados pelo banco de dados.
export interface IRegisteredUser {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password_hash: string; // Incluí aqui para fins de exemplo, mas em uma app real você não retornaria isso
    created_at: Date;
    updated_at: Date;
}