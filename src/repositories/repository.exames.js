import { execute } from "../database/sqlite.js";

async function Listar() {
    const sql = `SELECT * FROM exames ORDER BY nome`;
    return await execute(sql);
}

async function ListarPorId(id) {
    const sql = `SELECT * FROM exames WHERE id = ?`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

async function Inserir(dados) {
    const sql = `INSERT INTO exames (nome) VALUES (?) RETURNING *`;
    const valores = [dados.nome];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Editar(id, dados) {
    const sql = `UPDATE exames SET nome = ? WHERE id = ? RETURNING *`;
    const valores = [dados.nome, id];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Excluir(id) {
    const sql = `DELETE FROM exames WHERE id = ? RETURNING *`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
