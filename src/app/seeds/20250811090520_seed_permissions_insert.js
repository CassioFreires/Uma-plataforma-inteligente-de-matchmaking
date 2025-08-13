/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('permissions').del()
  await knex('permissions').insert([
  { id: 1, name: 'create_user', description: 'Permite criar novos usuários' },
  { id: 2, name: 'delete_user', description: 'Permite deletar usuários' },
  { id: 3, name: 'create_mission', description: 'Permite criar missões/projetos' },
  { id: 4, name: 'view_all_users', description: 'Visualiza todos os usuários da plataforma' },
  { id: 5, name: 'manage_roles', description: 'Gerencia roles e permissões do sistema' }
]);
};
