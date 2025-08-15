import { Response } from "express";
import { IErrorResponse } from "../interfaces/auth/errorResponse-interface";

export function sendSuccess<T = any>(
    res: Response,
    data?: T | any,
    message: string = "Operação realizada com sucesso",
    status: number = 200
) {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}


export const sendError =(res: Response, message: string, status = 400) => {
    const errorResponse: IErrorResponse = { success: false, message };
    return res.status(status).json(errorResponse);
};