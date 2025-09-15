# Saúde-Exames API

API construída em **Node.js + Express** com documentação integrada via **Swagger**.

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
Inicie o servidor local:

bash
Copy
Edit
npm start
O servidor rodará em:

Local: http://localhost:3001

Swagger: http://localhost:3001/api-docs

🌐 Expondo o servidor com Cloudflare Tunnel
Para acessar a API fora da sua máquina, usamos o Cloudflare Tunnel.

Instalação do Cloudflared
Linux (Debian/Ubuntu):

bash
Copy
Edit
sudo apt update
sudo apt install cloudflared
Verifique a instalação:

bash
Copy
Edit
cloudflared --version
Rodando manualmente
Abra outro terminal e execute:

bash
Copy
Edit
cloudflared tunnel --url http://localhost:3001
Isso irá gerar um endereço público como:

arduino
Copy
Edit
https://example-tunnel.trycloudflare.com
Rodando junto com o servidor
Já deixamos configurado no package.json um script para iniciar servidor e túnel juntos:

json
Copy
Edit
"scripts": {
  "dev": "node index.js & cloudflared tunnel --url http://localhost:3001"
}
Execute:

bash
Copy
Edit
npm run dev
Assim o servidor sobe em localhost:3001 e automaticamente fica disponível com um link público via Cloudflare Tunnel.

📚 Documentação
Após rodar o projeto, a documentação estará disponível em:

bash
Copy
Edit
http://localhost:3001/api-docs
Ou no link público gerado pelo Cloudflare Tunnel.

yaml
Copy
Edit

---
executar o projeto 
node --watch '.\src\index.js'    

👉 Quer que eu já ajuste o seu `package.json` para incluir esse script `dev` e te mostrar como fica?







Ask ChatGPT
