import repositoryLista_atendimento from "../repositories/repository.lista_atendimento.js";

async function Listar() {
    return await repositoryLista_atendimento.Listar();
}
async function Listar_proximo() {
    return await repositoryLista_atendimento.Listar_proximo();
}

async function ListarPorId(id) {
    return await repositoryLista_atendimento.ListarPorId(id);
}

async function Inserir(dados) {
    return await repositoryLista_atendimento.Inserir(dados);
}

async function Editar(id, dados) {
    return await repositoryLista_atendimento.Editar(id, dados);
}

async function Editar_fila(id_fila, id_agendamento) {
    return await repositoryLista_atendimento.Editar_fila(id_fila, id_agendamento);
}

async function Excluir(id) {
    return await repositoryLista_atendimento.Excluir(id);
}

export default { Listar_proximo, Listar, ListarPorId, Inserir, Editar, Editar_fila, Excluir };
