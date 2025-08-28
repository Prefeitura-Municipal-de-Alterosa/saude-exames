// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";
// import router from "./routes.js";
// import setupSwagger from "./swagger.js";

// const app = express();
// const PORT = 3001;

// app.use(express.json());
// app.use(cors());

// // Swagger (disponível em /api-docs)
// setupSwagger(app);

// // Suas rotas da aplicação
// app.use(router);

// // Configuração do Nodemailer
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: { 
//         user: "gabrielruascurriculo@gmail.com", 
//         pass: "ybek xgsa lkmg nsru" // senha de app
//     },
// });

// // Função para enviar email
// async function sendTestEmail() {
//     try {
//         const info = await transporter.sendMail({
//             from: "gabrielruascurriculo@gmail.com",
//             to: "gabrielruas30@gmail.com",
//             subject: "🚀 Teste de envio",
//             text: "O servidor subiu com sucesso e este é um e-mail de teste!",
//         });

//         console.log("✅ E-mail enviado:", info.response);
//     } catch (error) {
//         console.error("❌ Erro ao enviar e-mail:", error);
//     }
// }

// // Inicia o servidor
// app.listen(PORT, () => {
//     console.log(`✅ Servidor rodando na porta: ${PORT}`);
//     console.log(`📚 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);

//     // Envia e-mail de teste
//     sendTestEmail();
// });
import express from "express";
import cors from "cors";
import { exec } from "child_process";
import nodemailer from "nodemailer";
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

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { 
    user: "gabrielruascurriculo@gmail.com", 
    pass: "ybek xgsa lkmg nsru" // senha de app
  },
});

// Função para enviar email
async function sendTestEmail(link) {
  console.log("📨 Tentando enviar e-mail com link:", link);

  try {
    const info = await transporter.sendMail({
      from: "gabrielruascurriculo@gmail.com",
      to: "gabrielruas30@gmail.com",
      subject: "🚀 Teste de envio",
      text: `O servidor subiu com sucesso!\n\nLink público: ${link}`,
    });

    console.log("✅ E-mail enviado com sucesso!");
    console.log("📧 Resposta do servidor de e-mail:", info.response);
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:");
    console.error(error);
  }
}

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta: ${PORT}`);
  console.log(`📚 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);

  // Executa o Cloudflared automaticamente
  console.log("🚀 Iniciando Cloudflared...");
  const cloudflared = exec(`cloudflared tunnel --url http://localhost:${PORT}`);

  let emailSent = false; // garante que só envia uma vez

  // Função auxiliar que tenta capturar a URL
  function checkForTunnelUrl(data, source) {
    const text = data.toString();
    console.log(`🔎 [${source}] Saída:`, text);

    const match = text.match(/https:\/\/[^\s]+\.trycloudflare\.com/);
    if (match && !emailSent) {
      const tunnelUrl = match[0];
      console.log("🔗 Tunnel URL detectado:", tunnelUrl);
      sendTestEmail(tunnelUrl);
      emailSent = true;
    }
  }

  cloudflared.stdout.on("data", (data) => checkForTunnelUrl(data, "STDOUT"));
  cloudflared.stderr.on("data", (data) => checkForTunnelUrl(data, "STDERR"));

  cloudflared.on("close", (code) => {
    console.log(`⚠️ Cloudflared finalizado com código: ${code}`);
  });
});
