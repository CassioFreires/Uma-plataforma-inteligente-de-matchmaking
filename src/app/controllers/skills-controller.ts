import { Request, Response } from "express";
import { CreateSkillsDto } from "../dto/skills/create-skill-dto";
import { sendError, sendSuccess } from "../utils/response-helper";
import SkillsSevice from "../services/skills-service";
import { UpdateSkillsDto } from "../dto/skills/update-skill-dto";


export default class SkillsController {
    private readonly skillsService: SkillsSevice;

    constructor(skillsService?: SkillsSevice) {
        this.skillsService = skillsService || new SkillsSevice()
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const createSkillsDto: CreateSkillsDto = req.body;
            if (!createSkillsDto.name?.trim() || !createSkillsDto.description?.trim() || createSkillsDto.category_id == null) {
                return sendError(res, 'É necessário preencher todos os campos!', 400);
            }
            const skill = await this.skillsService.create(createSkillsDto);
            return sendSuccess(res, skill, 'Habilidade criado com sucesso!', 201);
        } catch (error: any) {
            console.log(error)
            if (error.code === '23505') {
                return sendError(res, 'Habilidade já cadastrada!', 400);
            }
            return sendError(res, 'Erro interno ao tentar criar habilidade', 500)
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const skills = await this.skillsService.getAll();
            if (!skills || skills.length <= 0) {
                return sendError(res, 'Não existe nenhuma habilidade cadastrada!', 404);
            }
            return sendSuccess(res, skills, 'Lista de habilidades cadastrado no sistema', 200);
        } catch (error) {
            return sendError(res, 'Erro interno ao tentar buscar todas habilidades no sistema', 500);
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const skill = await this.skillsService.getById(Number(id));
            if (!skill) {
                return sendError(res, 'Habilidade não existe!', 400)
            }
            return sendSuccess(res, skill, 'Não foi possível localizar está Habilidade através do ID', 200);
        } catch (error) {
            return sendError(res, 'Erro interno ao tentar buscar habilidade através do ID');
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const updateSkillsDto: UpdateSkillsDto = req.body || {};

            // Validação: pelo menos um campo deve ser preenchido
            if (!updateSkillsDto.name?.trim() && !updateSkillsDto.description?.trim()) {
                return sendError(
                    res,
                    'Para atualizar a habilidade é necessário preencher pelo menos um campo',
                    400
                );
            }

            // Chama o service para atualizar
            const updatedSkill = await this.skillsService.update(Number(id), updateSkillsDto);

            if (!updatedSkill) {
                // Se não encontrou a skill
                return sendError(res, 'Habilidade não encontrada', 404);
            }

            return sendSuccess(res, updatedSkill, 'Habilidade atualizada com sucesso', 200);
        } catch (error: any) {
            console.error('Erro no controller:', error);
            return sendError(res, 'Erro interno ao tentar atualizar a habilidade', 500);
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const deletedSkill = await this.skillsService.delete(Number(id));

            if (!deletedSkill) {
                return sendError(res, 'Habilidade não encontrada', 404);
            }

            return sendSuccess(res, deletedSkill, 'Habilidade deletada com sucesso', 200);
        } catch (error: any) {
            console.error('Erro no controller:', error);
            return sendError(res, 'Erro interno ao tentar deletar a habilidade', 500);
        }
    }

}