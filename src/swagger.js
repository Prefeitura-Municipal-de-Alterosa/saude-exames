import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

// Configurar __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Pacientes",
    version: "1.0.0",
    description: "Documentação da API para gerenciar pacientes",
  },
  servers: [
    {
      url: "http://localhost:3001", // ou sua URL de API
      description: "Servidor local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // opcional, apenas informativo
      },
    },
  },
  security: [
    {
      bearerAuth: [], // Aplica globalmente a todas as rotas (opcional)
    },
  ],
};




// Caminho correto para o arquivo src/routes.js
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "routes.js")], // ajustado para src/routes.js
};

// Geração da especificação
const swaggerSpec = swaggerJSDoc(options);

// Função que adiciona o Swagger ao app Express
function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default setupSwagger;
