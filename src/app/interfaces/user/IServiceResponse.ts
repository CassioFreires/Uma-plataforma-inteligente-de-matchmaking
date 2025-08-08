export interface IServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[] | string;
}