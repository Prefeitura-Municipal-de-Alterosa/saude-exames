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

async function ListarPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const registro = await serviceArexames.ListarPorId(id);
        if (registro) {
            res.status(200).json(registro);
        } else {
            res.status(404).json({ error: "N�o encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Inserir(req, res) {
    try {
        const { id_pacientecpf, nome } = req.body; // campos do form-data
        const arquivo = req.file; // arquivo enviado

        if (!arquivo) {
            return res.status(400).json({ error: "É necessário enviar um arquivo." });
        }

        // Monta objeto para enviar ao service
        const dados = {
            nome,
            arquivo // ou arquivo.filename se quiser só o nome do arquivo
        };

        // Log opcional para debug
        // console.log("📥 Dados recebidos do body:", { id_pacientecpf, nome });
        // console.log("📄 Arquivo recebido:", {
        //     nomeOriginal: arquivo.originalname,
        //     nomeSalvo: arquivo.filename,
        //     tipo: arquivo.mimetype,
        //     tamanho: arquivo.size
        // });

        // Chama service para inserir no banco
        const novo = await serviceArexames.Inserir(dados);
        res.status(201).json(novo);

    } catch (error) {
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

export default { Listar, ListarPorId, Inserir, Excluir, Download };
