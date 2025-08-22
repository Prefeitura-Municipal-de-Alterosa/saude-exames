import repositoryPaciente from "../repositories/repository.paciente.js";

async function Listar() {
    const pacientes = await repositoryPaciente.Listar();
    return pacientes;
}

async function Inserir(paciente) {
    const novoPaciente = await repositoryPaciente.Inserir(paciente);
    return novoPaciente;
}

async function Editar(id_paciente, dadosAtualizados) {
    const pacienteAtualizado = await repositoryPaciente.Editar(id_paciente, dadosAtualizados);
    return pacienteAtualizado;
}

async function Excluir(id_paciente) {
    await repositoryPaciente.Excluir(id_paciente);
}

async function ListarPorId(nome) {
    const paciente = await repositoryPaciente.ListarPorId(nome);
    return paciente;
}

export default {
    Listar,
    Inserir,
    Editar,
    Excluir,
    ListarPorId
};
