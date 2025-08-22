import serviceExames from "../services/service.exames.js";

async function Listar(req, res) {
    try {
        const registros = await serviceExames.Listar();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function ListarPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const registro = await serviceExames.ListarPorId(id);
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
        const { nome } = req.body;
        const novo = await serviceExames.Inserir({ nome });
        res.status(201).json(novo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Editar(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { nome } = req.body;
        const atualizado = await serviceExames.Editar(id, { nome });
        if (atualizado) {
            res.status(200).json({ message: "Atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "N�o encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Excluir(req, res) {
    try {
        const id = parseInt(req.params.id);
        const excluido = await serviceExames.Excluir(id);
        if (excluido) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "N�o encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
