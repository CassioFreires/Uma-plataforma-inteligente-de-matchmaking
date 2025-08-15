import { Router, Request, Response } from "express";
import SkillsController from "../controllers/skills-controller";


const skillsRouters = Router();
const skillsController = new SkillsController();


skillsRouters.post('/', (req: Request, res: Response) => skillsController.create(req, res));
skillsRouters.get('/', (req: Request, res: Response) => skillsController.getAll(req, res));
skillsRouters.get('/:id', (req: Request, res: Response) => skillsController.getById(req, res));
skillsRouters.patch('/:id', (req: Request, res: Response) => skillsController.update(req, res));
skillsRouters.delete('/:id', (req: Request, res: Response) => skillsController.delete(req, res));

export default skillsRouters;