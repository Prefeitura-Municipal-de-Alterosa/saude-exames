import serviceLinkurl from "../services/service.linkurl.js";

async function Listar(req, res) {
    try {
        const registros = await serviceLinkurl.Listar();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function ListarPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const registro = await serviceLinkurl.ListarPorId(id);
        if (registro) {
            res.status(200).json(registro);
        } else {
            res.status(404).json({ error: "Não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Inserir(req, res) {
    try {
        const { url } = req.body;
        const novo = await serviceLinkurl.Inserir({ url });
        res.status(201).json(novo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Editar(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { url } = req.body;
        const atualizado = await serviceLinkurl.Editar(id, { url });
        if (atualizado) {
            res.status(200).json({ message: "Atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Excluir(req, res) {
    try {
        const id = parseInt(req.params.id);
        const excluido = await serviceLinkurl.Excluir(id);
        if (excluido) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
