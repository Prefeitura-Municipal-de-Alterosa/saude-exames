import serviceArexames from "../services/service.arexames.js";
import path from "path";

async function Listar(req, res) {
    try {
        const registros = await serviceArexames.Listar();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Pesquisar(req, res) {
    try {
        const { nome, exame, finalizado } = req.query;

        // Verifica se pelo menos um parâmetro foi informado
        if (!nome && !exame && finalizado === undefined) {
            return res.status(400).json({ error: "Informe pelo menos um parâmetro: nome, exame ou finalizado." });
        }

        // Monta objeto de pesquisa
        const dados = { nome, exame, finalizado };

        // Chama o service com os filtros
        const registros = await serviceArexames.Pesquisar(dados);

        if (registros && registros.length > 0) {
            res.status(200).json(registros);
        } else {
            res.status(404).json({ error: "Nenhum exame encontrado." });
        }
    } catch (error) {
        console.error("Erro em controllerArexames.Pesquisar:", error);
        res.status(500).json({ error: error.message });
    }
}


async function Inserir(req, res) {
    try {
        const { id_pacientecpf, nome, exame, finalizado } = req.body; // campos do form-data
        const arquivo = req.file; // arquivo enviado pelo multer

        if (!arquivo) {
            return res.status(400).json({ error: "É necessário enviar um arquivo." });
        }

        // Monta objeto para enviar ao service
        const dados = {
            id_pacientecpf,
            nome,
            exame,
            finalizado,
            arquivo // se quiser salvar só o nome: arquivo.filename
        };

        // Log opcional para debug
        console.log("📥 Dados recebidos:", { id_pacientecpf, nome, exame, finalizado });
        console.log("📄 Arquivo recebido:", {
            nomeOriginal: arquivo.originalname,
            nomeSalvo: arquivo.filename,
            tipo: arquivo.mimetype,
            tamanho: arquivo.size
        });

        // Chama service para inserir no banco
        const novo = await serviceArexames.Inserir(dados);
        res.status(201).json(novo);

    } catch (error) {
        console.error("❌ Erro no Inserir:", error);
        res.status(500).json({ error: error.message });
    }
}


async function Excluir(req, res) {
    try {
        const id = parseInt(req.params.id);
        const excluido = await serviceArexames.Excluir(id);
        if (excluido) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "N�o encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Download(req, res) {
    try {
        const nomeArquivo = req.params.nome;
        const filePath = path.resolve("uploads/arexames", nomeArquivo);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ error: "Arquivo n�o encontrado." });
    }
}

export default { Listar, Pesquisar, Inserir, Excluir, Download };
