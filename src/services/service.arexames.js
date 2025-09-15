import repositoryArexames from "../repositories/repository.arexames.js";

async function Listar() {
    return await repositoryArexames.Listar();
}

async function ListarPorId(id) {
    return await repositoryArexames.ListarPorId(id);
}

async function Inserir(dados) {
    return await repositoryArexames.Inserir(dados);
}

async function Editar(id, dados) {
    return await repositoryArexames.Editar(id, dados);
}

async function Excluir(id) {
    return await repositoryArexames.Excluir(id);
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
