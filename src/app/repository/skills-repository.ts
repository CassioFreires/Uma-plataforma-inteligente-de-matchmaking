import { CreateSkillsDto } from "../dto/skills/create-skill-dto"
import { UpdateSkillsDto } from "../dto/skills/update-skill-dto";
import SkillsModel from "../models/skills.model";
import { ISkill } from "../interfaces/skills/skills-interface";

export default class SkillsRepository {
    private readonly skillModel:SkillsModel;

    constructor(skillModel?:SkillsModel) {
        this.skillModel = skillModel || new SkillsModel()
    }

    async create(createSkillsDto: CreateSkillsDto): Promise<ISkill> {
        try {
            const result = await this.skillModel.create(createSkillsDto);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<ISkill[] | null> {
        try {
            const result = await this.skillModel.getAll();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getById(id:number): Promise<ISkill | null| undefined> {
        try {
            const result = await this.skillModel.getById(id);
            return result;
        } catch (error) {

        }
    }

    async update(id:number, updateSkillsDto:UpdateSkillsDto): Promise<ISkill | null | undefined> {
        try {
            const result = await this.skillModel.update(id, updateSkillsDto);
            return result;
        } catch (error) {

        }
    }

    async delete(id:number): Promise<ISkill | null | undefined> {
        try {
            const result = await this.skillModel.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}