export interface ISkill {
    id: number;
    name: string;
    description: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}
