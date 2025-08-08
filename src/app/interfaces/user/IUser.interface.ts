export interface IUser {
  id?:number;
  name: string;            // Nome completo (ou usar name + lastname separadamente)
  lastname: string;            // Nome de usuário (único)
  email: string;
  password_hash?:string,
  phone?: string;
  bio?: string;
  profilePictureUrl?: string;

  address?: {
    country: string;
    state: string;
    city: string;
  };

  socialLinks?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };

  roleId?: string;             // ID da role (admin, talento, empresa etc)
  permissions?: string[];      // IDs das permissões adicionais

  createdAt?: Date;
  updatedAt?: Date;
}
