import serviceAgendamentos from "../services/service.agendamentos.js";

async function Listar(req, res) {
    try {
        const registros = await serviceAgendamentos.Listar();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function ListarPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const registro = await serviceAgendamentos.ListarPorId(id);
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
        const { paciente_id, exame_id, protocolo_id, data_inicio, data_agendado, status } = req.body;
        const novo = await serviceAgendamentos.Inserir({ paciente_id, exame_id, protocolo_id, data_inicio, data_agendado, status });
        res.status(201).json(novo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Editar(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { paciente_id, exame_id, protocolo_id, data_inicio, data_agendado, status } = req.body;
        const atualizado = await serviceAgendamentos.Editar(id, { paciente_id, exame_id, protocolo_id, data_inicio, data_agendado, status });
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
        const excluido = await serviceAgendamentos.Excluir(id);
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
