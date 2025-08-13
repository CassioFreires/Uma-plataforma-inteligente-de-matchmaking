/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('skill_categories').del()
  await knex('skill_categories').insert([
  { id: 1, name: 'Tecnologia', description: 'Habilidades técnicas relacionadas a programação e infraestrutura' },
  { id: 2, name: 'Design', description: 'Habilidades visuais e de experiência do usuário' },
  { id: 3, name: 'Negócios', description: 'Habilidades voltadas para empreendedorismo e gestão' },
  { id: 4, name: 'Marketing', description: 'Habilidades ligadas à comunicação e crescimento de produtos' },
  { id: 5, name: 'Gestão de Projetos', description: 'Organização de times, metodologias ágeis e entregas' }
]);
};
