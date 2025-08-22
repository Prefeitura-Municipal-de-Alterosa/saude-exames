import repositoryAgendamentos from "../repositories/repository.agendamentos.js";

async function Listar() {
    return await repositoryAgendamentos.Listar();
}

async function ListarPorId(id) {
    return await repositoryAgendamentos.ListarPorId(id);
}

async function Inserir(dados) {
    return await repositoryAgendamentos.Inserir(dados);
}

async function Editar(id, dados) {
    return await repositoryAgendamentos.Editar(id, dados);
}

async function Excluir(id) {
    return await repositoryAgendamentos.Excluir(id);
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
