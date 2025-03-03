const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');
const routes = require('./src/routes/app');

const app = express();

// Configuração do Swagger antes das rotas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middleware para processar JSON
app.use(express.json());

// Aplicando as rotas
routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}, http://localhost:${port}/api-docs`));
