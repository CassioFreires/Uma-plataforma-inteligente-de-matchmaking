import knex from "knex";
import dotenv from 'dotenv';
dotenv.config();

export const configKnex = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_URL_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  migrations: {
    directory: './migrations'
  }
});

export async function tryDatabaseConnection() {
  try {
    await configKnex.raw('SELECT 1');
    console.log('✅ Conectado ao banco de dados com sucesso!');
  } catch (error) {
    console.error('❌ Falha ao conectar ao banco:', error);
    process.exit(1);
  }
}