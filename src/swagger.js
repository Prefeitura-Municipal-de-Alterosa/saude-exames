import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

// Configurar __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detecta automaticamente a URL base
const PORT = process.env.PORT || 3001;
const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${PORT}`;

// Definição do Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Pacientes",
    version: "1.0.0",
    description: "Documentação da API para gerenciar pacientes",
  },
  servers: [
    {
      url: PUBLIC_URL, // ✅ se tiver variável PUBLIC_URL (ex: Cloudflared), ele usa
      description: "Servidor atual",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Caminho correto para o arquivo de rotas
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "routes.js")],
};

// Geração da especificação
const swaggerSpec = swaggerJSDoc(options);

// Função para adicionar o Swagger ao app Express
function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📚 Swagger disponível em: ${PUBLIC_URL}/api-docs`);
}

export default setupSwagger;
