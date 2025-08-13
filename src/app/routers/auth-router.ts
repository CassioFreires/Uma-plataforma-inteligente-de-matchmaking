import { Request, Response, Router } from "express";
import AuthController from "../controllers/auth-controller";

const authRouters = Router();
const authController = new AuthController()


authRouters.post('/login', (req:Request, res:Response) => authController.login(req, res));
authRouters.post('/register', (req:Request, res:Response) => authController.register(req, res));




export default authRouters;