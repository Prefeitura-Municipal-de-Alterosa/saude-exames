import repositoryExames from "../repositories/repository.exames.js";

async function Listar() {
    return await repositoryExames.Listar();
}

async function ListarPorId(id) {
    return await repositoryExames.ListarPorId(id);
}

async function Inserir(dados) {
    return await repositoryExames.Inserir(dados);
}

async function Editar(id, dados) {
    return await repositoryExames.Editar(id, dados);
}

async function Excluir(id) {
    return await repositoryExames.Excluir(id);
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
