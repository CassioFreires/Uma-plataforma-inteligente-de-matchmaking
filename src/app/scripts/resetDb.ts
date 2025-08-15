import Knex from 'knex';
const knexConfig: any = require('../../../knexfile'); // ignora o TS

const knex = Knex(knexConfig.local);

async function resetDatabase() {
  try {
    console.log('🔄 Rodando migrations...');
    await knex.migrate.latest(); // agora funciona, porque knex é uma instância

    console.log('🔄 Truncando tabelas e resetando sequências...');
    const tables = [
      'role_permissions',
      'skills',
      'skill_categories',
      'users',
      'roles',
      'permissions',
    ];

    // Desativa FK temporariamente
    await knex.raw('SET session_replication_role = replica;');
    for (const table of tables) {
      await knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`);
    }
    await knex.raw('SET session_replication_role = DEFAULT;');

    console.log('✅ Todas as tabelas truncadas e sequências reiniciadas');

    console.log('📦 Rodando seeds...');
    await knex.seed.run();
    console.log('✅ Seeds inseridos com sucesso');

  } catch (error) {
    console.error('❌ Erro ao resetar o banco:', error);
  } finally {
    await knex.destroy(); // agora existe!
  }
}

// Executa o script
resetDatabase();