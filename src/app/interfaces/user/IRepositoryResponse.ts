export interface IRepositoryResponse<T> {
  data?: T;
  success: boolean;
  message?: string;
  errors?: string | string[];
}