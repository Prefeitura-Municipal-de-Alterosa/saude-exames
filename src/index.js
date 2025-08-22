import express from "express";
import cors from "cors";
import router from "./routes.js";
import setupSwagger from "./swagger.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Swagger (disponível em /api-docs)
setupSwagger(app);

// Suas rotas da aplicação
app.use(router);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta: ${PORT}`);
    console.log(`📚 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
    console.log("🌐 Para expor o servidor publicamente, rode no terminal:");
    console.log(`   cloudflared tunnel --url http://localhost:${PORT}`);
});
