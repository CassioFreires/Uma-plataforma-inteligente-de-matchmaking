exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('skills').del();
  await knex('skills').insert([
    { id: 1, name: 'JavaScript', category_id: 1, description: 'Linguagem de programação para web frontend/backend' },
    { id: 2, name: 'React', category_id: 1, description: 'Biblioteca JavaScript para construção de interfaces' },
    { id: 3, name: 'UI/UX', category_id: 2, description: 'Design de interfaces e experiência do usuário' },
    { id: 4, name: 'Figma', category_id: 2, description: 'Ferramenta colaborativa de design' },
    { id: 5, name: 'Empreendedorismo', category_id: 3, description: 'Capacidade de iniciar e gerir negócios' },
    { id: 6, name: 'Scrum', category_id: 5, description: 'Framework ágil para desenvolvimento de projetos' },
    { id: 7, name: 'SEO', category_id: 4, description: 'Otimização de sites para mecanismos de busca' }
  ]);
};
