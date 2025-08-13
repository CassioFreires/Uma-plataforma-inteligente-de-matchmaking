/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
  { id: 1, name: 'admin', description: 'Administrador com acesso total ao sistema' },
  { id: 2, name: 'user', description: 'Usuário comum que participa de missões e projetos' },
  { id: 3, name: 'company', description: 'Conta empresarial para criação e gestão de missões' }
]);
};
