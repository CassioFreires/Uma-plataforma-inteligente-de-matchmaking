import {Router, Request, Response} from 'express';
import UserController from '../controllers/user-controller';

const userRouters = Router();

const userController = new UserController();


userRouters.get('/', (req:Request, res:Response) => userController.getAll(req, res));
userRouters.post('/', (req:Request, res:Response) => userController.create(req, res));
userRouters.get('/:id', (req:Request, res:Response) => userController.getById(req, res));
userRouters.patch('/:id', (req:Request, res:Response) => userController.update(req, res));
userRouters.delete('/:id', (req:Request, res:Response) => userController.delete(req, res));


export default userRouters;