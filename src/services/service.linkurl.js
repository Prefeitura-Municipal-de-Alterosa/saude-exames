import repositoryLinkurl from "../repositories/repository.linkurl.js";

async function Listar() {
    return await repositoryLinkurl.Listar();
}

async function ListarPorId(id) {
    return await repositoryLinkurl.ListarPorId(id);
}

async function Inserir(dados) {
    return await repositoryLinkurl.Inserir(dados);
}

async function Editar(id, dados) {
    return await repositoryLinkurl.Editar(id, dados);
}

async function Excluir(id) {
    return await repositoryLinkurl.Excluir(id);
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
