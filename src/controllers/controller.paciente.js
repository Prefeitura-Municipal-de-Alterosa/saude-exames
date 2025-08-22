import servicePaciente from "../services/service.paciente.js";

async function Listar(req, res) {
    try {
        const pacientes = await servicePaciente.Listar();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Inserir(req, res) {
    try {
        const novoPaciente = req.body;
        const pacienteCriado = await servicePaciente.Inserir(novoPaciente);
        res.status(201).json(pacienteCriado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Editar(req, res) {
    try {
        const id_paciente = req.params.id_paciente;
        const dadosAtualizados = req.body;
        const pacienteAtualizado = await servicePaciente.Editar(id_paciente, dadosAtualizados);
        res.status(200).json(pacienteAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Excluir(req, res) {
    try {
        const id_paciente = req.params.id_paciente;
        await servicePaciente.Excluir(id_paciente);
        res.status(204).send(); // sem conteúdo
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function ListarPorId(req, res) {
    try {
        const nome = req.body.nome;

        // Validação do nome
        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            return res.status(400).json({ error: "Nome inválido" });
        }

        console.log("Nome:", nome);

        const paciente = await servicePaciente.ListarPorId(nome);

        if (paciente && paciente.length > 0) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ error: "Paciente não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export default {
    Listar,
    Inserir,
    Editar,
    Excluir,
    ListarPorId
};
