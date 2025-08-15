import { configKnex } from "../../config/configKnex";
import { Knex } from "knex";
import { CreateSkillsDto } from "../dto/skills/create-skill-dto";
import { UpdateSkillsDto } from "../dto/skills/update-skill-dto";
import { ISkill } from "../interfaces/skills/skills-interface";

export default class SkillsModel {
    private readonly db: Knex;

    constructor(instanceKnex?: Knex) {
        this.db = instanceKnex || configKnex;
    }

    async create(createSkillsDto: CreateSkillsDto): Promise<ISkill> {
        try {
            const [skills] = await this.db('skills')
            .insert(createSkillsDto)
            .returning('*');
            return skills;
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<ISkill[] | null> {
        try {
            const select = await this.db('skills')
                .select('*')
                .orderBy('created_at', 'desc');
            return select;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<ISkill | null> {
        try {
            const [selectOne] = await this.db('skills')
                .select('*')
                .where({ id: id })

            return selectOne;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateSkillsDto: UpdateSkillsDto): Promise<ISkill | null> {
        try {
            const [updatedSkill] = await this.db('skills')
                .where({ id })
                .update(updateSkillsDto)
                .returning('*');
            return updatedSkill || null;
        } catch (error) {
            console.error('Erro no repository:', error);
            throw error;
        }
    }

    async delete(id: number): Promise<ISkill | null> {
        const [deletedSkill] = await this.db('skills')
            .where({ id })
            .del()
            .returning('*');

        return deletedSkill || null;
    }

}