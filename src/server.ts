import express from 'express';
import swaggerIU from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json'
import userRouters from './app/routers/user-router';
import {tryDatabaseConnection } from './config/configKnex';
import authRouters from './app/routers/auth-router';
import skillsRouters from './app/routers/skills-router';


const app = express();

app.use(express.json())
app.use('/api-docs', swaggerIU.serve, swaggerIU.setup(swaggerDocument));
app.use('/users', userRouters);
app.use('/auth', authRouters);
app.use('/skills', skillsRouters);


async function startServer() {
    try {
        await tryDatabaseConnection();

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
            console.log('Documentação Swagger disponível em /api-docs');
        });

    } catch (error) {
        console.error('❌ Erro ao conectar com o banco de dados:', error);
        process.exit(1); // encerra o processo se não conectar com o banco
    }
}

startServer()