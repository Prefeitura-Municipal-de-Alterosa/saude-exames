import { execute } from "../database/sqlite.js";

async function Listar() {
    const sql = `SELECT * FROM linkurl ORDER BY url`;
    return await execute(sql);
}

async function ListarPorId(id) {
    const sql = `SELECT * FROM linkurl WHERE id = ?`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

async function Inserir(dados) {
    const sql = `INSERT INTO linkurl (url) VALUES (?) RETURNING *`;
    const valores = [dados.url];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Editar(id, dados) {
    if (!dados || !dados.url) {
        throw new Error("O campo 'url' é obrigatório.");
    }

    const sql = `UPDATE linkurl SET url = ? WHERE id = ?`;
    const valores = [dados.url, id];
    const resultado = await execute(sql, valores);
    return resultado[0];
}


async function Excluir(id) {
    const sql = `DELETE FROM linkurl WHERE id = ? RETURNING *`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
