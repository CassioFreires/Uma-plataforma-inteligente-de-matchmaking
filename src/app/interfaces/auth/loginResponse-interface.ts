
export interface ILoginResponse {
    token:string,
    user: {
        id:number,
        name: string,
        lastname: string,
        email: string,
        password_hash?:string
    }
}


export interface IUserFromDb {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password_hash: string;
}