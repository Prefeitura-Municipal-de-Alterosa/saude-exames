import { Router } from "express";
import jwt from "./token.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Controllers
import controllerCategoria from "./controllers/controller.categoria.js";
import controllerBanner from "./controllers/controller.banner.js";
import controllerEmpresa from "./controllers/controller.empresa.js";
import controllerPedido from "./controllers/controller.pedido.js";
import controllerUsuario from "./controllers/controller.usuario.js";
import controllerPaciente from "./controllers/controller.paciente.js";
import controllerExame from "./controllers/controller.exames.js";
import controllerAgendamentos from "./controllers/controller.agendamentos.js";
import controllerLista_atendimento from "./controllers/controller.lista_atendimento.js";
import controllerLinkurl from "./controllers/controller.linkurl.js";
import controllerArexames from "./controllers/controller.arexames.js";

//################################# FUNÇAO AREXAMES INICIO ##############################################
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join("uploads", "arexames");

        // Cria a pasta se não existir
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath); // define a pasta de destino
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nomeArquivo = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, nomeArquivo);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes("pdf")) {
            return cb(new Error("Apenas arquivos PDF são permitidos!"));
        }
        cb(null, true);
    }
});
//################################# FUNCAO AREXAMES FIM #################################################
const router = Router();

//################################# AREXAMES INICIO ##############################################

/**
 * @swagger
 * /arexames:
 *   get:
 *     summary: Lista todos os exames
 *     tags: [Arexames]
 *     responses:
 *       200:
 *         description: Lista de exames
 */
router.get("/arexames", controllerArexames.Listar);

/**
 * @swagger
 * /arexames/{id}:
 *   get:
 *     summary: Busca exame por ID
 *     tags: [Arexames]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exame encontrado
 *       404:
 *         description: Não encontrado
 */
router.get("/arexames/:id", controllerArexames.ListarPorId);

/**
 * @swagger
 * /arexames/{id}:
 *   delete:
 *     summary: Exclui exame por ID
 *     tags: [Arexames]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Exame excluído
 *       404:
 *         description: Não encontrado
 */
router.delete("/arexames/:id", controllerArexames.Excluir);

/**
 * @swagger
 * /arexames:
 *   post:
 *     summary: Upload de exame em PDF com dados do paciente
 *     tags: [Arexames]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do paciente
 *                 example: "João da Silva"
 *               arquivo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo PDF do exame
 *     responses:
 *       201:
 *         description: Exame cadastrado com sucesso
 *       400:
 *         description: Erro ao enviar o arquivo
 */
router.post("/arexames", upload.single("arquivo"), controllerArexames.Inserir);


/**
 * @swagger
 * /arexames/arquivo/{nome}:
 *   get:
 *     summary: Download do arquivo PDF
 *     tags: [Arexames]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arquivo retornado
 *       404:
 *         description: Arquivo não encontrado
 */
router.get("/arexames/arquivo/:nome", controllerArexames.Download);

//################################# AREXAMES FIM #################################################

//################################# LINKURL INICIO ##############################################
/**
 * @swagger
 * tags:
 *   - name: Linkurl
 *     description: Operações relacionadas à tabela linkurl
 */

/**
 * @swagger
 * /linkurl:
 *   get:
 *     summary: Listar todos os registros
 *     tags: [Linkurl]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
router.get("/linkurl", controllerLinkurl.Listar);

/**
 * @swagger
 * /linkurl/{id}:
 *   get:
 *     summary: Buscar registro por ID
 *     tags: [Linkurl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
router.get("/linkurl/:id", controllerLinkurl.ListarPorId);

/**
 * @swagger
 * /linkurl:
 *   post:
 *     summary: Criar novo registro
 *     tags: [Linkurl]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro criado
 */
router.post("/linkurl", controllerLinkurl.Inserir);

/**
 * @swagger
 * /linkurl/{id}:
 *   put:
 *     summary: Atualizar registro
 *     tags: [Linkurl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado
 */
router.put("/linkurl/:id", controllerLinkurl.Editar);

/**
 * @swagger
 * /linkurl/{id}:
 *   delete:
 *     summary: Deletar registro
 *     tags: [Linkurl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Registro excluído
 */
router.delete("/linkurl/:id", controllerLinkurl.Excluir);

//################################# LINKURL FIM ##############################################
/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/pacientes", controllerPaciente.Listar);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Buscar paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 */
router.post("/pacientes/:id", controllerPaciente.ListarPorId);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cadastrar um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado
 */
router.post("/pacientes", jwt.ValidateJWT, controllerPaciente.Inserir);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Atualizar dados de um paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado
 */
router.put("/pacientes/:id", jwt.ValidateJWT, controllerPaciente.Editar);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Remover um paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Paciente removido
 */
router.delete("/pacientes/:id", jwt.ValidateJWT, controllerPaciente.Excluir);


/// ############################### Tablela exames Inicio ################################################
/**
 * @swagger
 * tags:
 *   - name: Exames
 *     description: Operações relacionadas aos exames
 */

/**
 * @swagger
 * /exames:
 *   get:
 *     summary: Lista todos os exames
 *     tags: [Exames]
 *     responses:
 *       200:
 *         description: Lista de exames
 */
router.get("/exames", controllerExame.Listar);

/**
 * @swagger
 * /exames/{id}:
 *   get:
 *     summary: Buscar exame por ID
 *     tags: [Exames]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do exame
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exame encontrado
 */
router.get("/exames/:id", jwt.ValidateJWT, controllerExame.ListarPorId);

/**
 * @swagger
 * /exames:
 *   post:
 *     summary: Cadastrar novo exame
 *     tags: [Exames]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exame:
 *                 type: string
 *     responses:
 *       201:
 *         description: Exame criado
 */
router.post("/exames", jwt.ValidateJWT, controllerExame.Inserir);

/**
 * @swagger
 * /exames/{id}:
 *   put:
 *     summary: Atualizar exame
 *     tags: [Exames]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do exame
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exame:
 *                 type: string
 *     responses:
 *       200:
 *         description: Exame atualizado
 */
router.put("/exames/:id", jwt.ValidateJWT, controllerExame.Editar);

/**
 * @swagger
 * /exames/{id}:
 *   delete:
 *     summary: Remover exame
 *     tags: [Exames]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do exame
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Exame removido
 */
router.delete("/exames/:id", jwt.ValidateJWT, controllerExame.Excluir);


/// ############################### Tablela exames Fim ################################################



// -----------------------------------------------------
// As rotas abaixo estão comentadas — ative quando necessário
// -----------------------------------------------------

// Categorias e banners
// router.get("/categorias", jwt.ValidateJWT, controllerCategoria.Listar);
// router.get("/banners", jwt.ValidateJWT, controllerBanner.Listar);

// Empresas
// router.get("/empresas/destaques", jwt.ValidateJWT, controllerEmpresa.Destaques);
// router.get("/empresas", jwt.ValidateJWT, controllerEmpresa.Listar);
// router.post("/empresas/:id_empresa/favoritos", jwt.ValidateJWT, controllerEmpresa.InserirFavorito);
// router.delete("/empresas/:id_empresa/favoritos", jwt.ValidateJWT, controllerEmpresa.ExcluirFavorito);
// router.get("/empresas/:id_empresa/cardapio", jwt.ValidateJWT, controllerEmpresa.Cardapio);
// router.get("/empresas/:id_empresa/produtos/:id_produto", jwt.ValidateJWT, controllerEmpresa.ListarProdutoId);

// Pedidos
// router.get("/pedidos", jwt.ValidateJWT, controllerPedido.Listar);
// router.get("/pedidos/:id_pedido", jwt.ValidateJWT, controllerPedido.ListarId);
// router.post("/pedidos", jwt.ValidateJWT, controllerPedido.Inserir);

// Usuários
//router.get("/usuarios/favoritos", jwt.ValidateJWT, controllerUsuario.Favoritos);


/**
 * @swagger
 * tags:
 *   - name: Usuarios_sistema
 *     description: Operações relacionadas a usuários do sistema
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Usuarios_sistema]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - senha_hash
 *             properties:
 *               login:
 *                 type: string
 *                 example: gabriel@teste.com
 *               senha_hash:
 *                 type: string
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Login bem-sucedido com token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/usuarios/login", controllerUsuario.Login);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário do sistema
 *     tags: [Usuarios_sistema]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - senha_hash
 *               - nome_completo
 *               - perfil
 *             properties:
 *               login:
 *                 type: string
 *                 example: novo.usuario
 *               senha_hash:
 *                 type: string
 *                 example: $2b$10$abcd...
 *               nome_completo:
 *                 type: string
 *                 example: Novo Usuário
 *               perfil:
 *                 type: string
 *                 example: ATENDENTE
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/usuarios", jwt.ValidateJWT, controllerUsuario.Inserir);

/**
 * @swagger
 * /usuarios/perfil:
 *   get:
 *     summary: Retorna o perfil do usuário logado
 *     tags: [Usuarios_sistema]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 login:
 *                   type: string
 *                 nome_completo:
 *                   type: string
 *                 perfil:
 *                   type: string
 *       401:
 *         description: Token JWT inválido ou ausente
 */
router.get("/usuarios/perfil", jwt.ValidateJWT, controllerUsuario.Perfil);

//############################################## Agendamento INICIO ##################################################################
/**
 * @swagger
 * tags:
 *   - name: Agendamentos
 *     description: Opera��es relacionadas � tabela agendamentos
 */

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Listar todos os registros
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: Lista de registros
 */

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Listar todos os registros
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
router.get("/agendamentos", controllerAgendamentos.Listar);

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     summary: Buscar registro por ID
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
router.get("/agendamentos/:id", jwt.ValidateJWT, controllerAgendamentos.ListarPorId);

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Criar novo registro
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paciente_id:
 *                 type: string
 *               exame_id:
 *                 type: string
 *               protocolo_id:
 *                 type: string
 *               data_inicio:
 *                 type: string
 *               data_agendado:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro criado
 */
router.post("/agendamentos", jwt.ValidateJWT, controllerAgendamentos.Inserir);

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualizar registro
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paciente_id:
 *                 type: string
 *               exame_id:
 *                 type: string
 *               protocolo_id:
 *                 type: string
 *               data_inicio:
 *                 type: string
 *               data_agendado:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado
 */
router.put("/agendamentos/:id", jwt.ValidateJWT, controllerAgendamentos.Editar);

/**
 * @swagger
 * /agendamentos/{id}:
 *   delete:
 *     summary: Deletar registro
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Registro excluído
 */
router.delete("/agendamentos/:id", jwt.ValidateJWT, controllerAgendamentos.Excluir);

/// ############################### Tabela Lista_atendimento Início ################################################

/**
 * @swagger
 * tags:
 *   - name: Lista_atendimento
 *     description: Operações relacionadas à tabela lista_atendimento
 */

/**
 * @swagger
 * /lista_atendimento:
 *   get:
 *     summary: Listar todos os registros
 *     tags: [Lista_atendimento]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
router.get("/lista_atendimento", jwt.ValidateJWT, controllerLista_atendimento.Listar);
/**
 * @swagger
 * tags:
 *   - name: Lista_atendimento
 *     description: Operações relacionadas à tabela lista_atendimento
 */
/**
 * @swagger
 * /lista_atendimento/proximo:
 *   get:
 *     summary: Listar todos os registros
 *     tags: [Lista_atendimento]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
router.get("/lista_atendimento/proximo", jwt.ValidateJWT, controllerLista_atendimento.Listar_proximo);

/**
 * @swagger
 * /lista_atendimento/{id}:
 *   get:
 *     summary: Buscar registro por ID
 *     tags: [Lista_atendimento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
router.get("/lista_atendimento/:id", jwt.ValidateJWT, controllerLista_atendimento.ListarPorId);

/**
 * @swagger
 * /lista_atendimento:
 *   post:
 *     summary: Criar novo registro
 *     tags: [Lista_atendimento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               agendamento_id:
 *                 type: string
 *               prioridade:
 *                 type: string
 *               data_entrada:
 *                 type: string
 *               chamado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro criado
 */
router.post("/lista_atendimento", jwt.ValidateJWT, controllerLista_atendimento.Inserir);

/**
 * @swagger
 * /lista_atendimento/{id}:
 *   put:
 *     summary: Atualizar registro
 *     tags: [Lista_atendimento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               agendamento_id:
 *                 type: string
 *               prioridade:
 *                 type: string
 *               data_entrada:
 *                 type: string
 *               chamado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado
 */
router.put("/lista_atendimento/:id", jwt.ValidateJWT, controllerLista_atendimento.Editar);

/**
 * @swagger
 * /lista_atendimento/fila:
 *   put:
 *     summary: Atualizar registro
 *     tags: [Lista_atendimento]
 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               agendamento_id:
 *                 type: string
 *               fila_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado
 */
router.put("/lista_atendimento/fila", jwt.ValidateJWT, controllerLista_atendimento.Editar_fila);

/**
 * @swagger
 * /lista_atendimento/{id}:
 *   delete:
 *     summary: Deletar registro
 *     tags: [Lista_atendimento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Registro excluído
 */

router.delete("/lista_atendimento/:id", jwt.ValidateJWT, controllerLista_atendimento.Excluir);

export default router;
