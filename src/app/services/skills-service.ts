import { CreateSkillsDto } from "../dto/skills/create-skill-dto";
import { UpdateSkillsDto } from "../dto/skills/update-skill-dto";
import SkillsRepository from "../repository/skills-repository";
import { ISkill } from "../interfaces/skills/skills-interface";

export default class SkillsSevice {

    private readonly skillsRepository: SkillsRepository;

    constructor(skillsRepository?: SkillsRepository) {
        this.skillsRepository = skillsRepository || new SkillsRepository()
    }

    async create(createSkillsDto: CreateSkillsDto): Promise<ISkill> {
        try {
            const formatedSkills: CreateSkillsDto = {
                name: createSkillsDto.name.toUpperCase(),
                description: createSkillsDto.description.toLocaleUpperCase(),
                category_id: createSkillsDto.category_id
            };
            return this.skillsRepository.create(formatedSkills)
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<ISkill[] | null> {
        try {
            const data = await this.skillsRepository.getAll();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<ISkill | null | undefined> {
        try {
            const data = await this.skillsRepository.getById(id);
            return data;
        } catch (error) {

        }
    }

    async update(id: number, updateSkillsDto: UpdateSkillsDto): Promise<ISkill | null | undefined> {
        try {

            const updatedSkill = await this.skillsRepository.update(id, updateSkillsDto);

            if (!updatedSkill) return null;

            return updatedSkill;
        } catch (error) {
            console.error('Erro no service:', error);
            throw error;
        }
    }

    async delete(id: number): Promise<ISkill | null | undefined> {
        try {
            const deleted = await this.skillsRepository.delete(id);

            if (!deleted) return null; // Não encontrou a skill

            return deleted;
        } catch (error) {
            console.error('Erro no service:', error);
            throw error;
        }
    }

}