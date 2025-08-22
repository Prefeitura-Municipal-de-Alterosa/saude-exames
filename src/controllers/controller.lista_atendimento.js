import serviceLista_atendimento from "../services/service.lista_atendimento.js";

async function Listar(req, res) {
    try {
        const registros = await serviceLista_atendimento.Listar();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function Listar_proximo(req, res) {
    try {
        const registros = await serviceLista_atendimento.Listar_proximo();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function ListarPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const registro = await serviceLista_atendimento.ListarPorId(id);
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
        const { agendamento_id, prioridade, data_entrada, chamado } = req.body;
        const novo = await serviceLista_atendimento.Inserir({ agendamento_id, prioridade, data_entrada, chamado });
        res.status(201).json(novo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Editar(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { agendamento_id, prioridade, data_entrada, chamado } = req.body;
        const atualizado = await serviceLista_atendimento.Editar(id, { agendamento_id, prioridade, data_entrada, chamado });
        if (atualizado) {
            res.status(200).json({ message: "Atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Nao encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Editar_fila(req, res) {
    try {
        const { id_fila, id_agendamento} = req.body;
        const atualizado = await serviceLista_atendimento.Editar_fila({ id_fila, id_agendamento });
        if (atualizado) {
            res.status(200).json({ message: "Atualizado com sucesso" });
        } else {
            res.status(404).json({ error: "Nao encontrado" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function Excluir(req, res) {
    try {
        const id = parseInt(req.params.id);
        const excluido = await serviceLista_atendimento.Excluir(id);
        if (excluido) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "N�o encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { Listar_proximo, Listar, ListarPorId, Inserir, Editar, Editar_fila, Excluir };
