export interface IControllerResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[] | string;
}