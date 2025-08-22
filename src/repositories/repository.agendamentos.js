import { execute } from "../database/sqlite.js";

async function Listar() {
    const sql = `SELECT * FROM agendamentos ORDER BY paciente_id`;
    return await execute(sql);
}

async function ListarPorId(id) {
    const sql = `SELECT * FROM agendamentos WHERE paciente_id = ?`;
    const resultado = await execute(sql, [id]);
    return resultado; // retorna todos os registros
}

async function Inserir(dados) {
    const sql = `INSERT INTO agendamentos (paciente_id, exame_id, protocolo_id, data_inicio, data_agendado, status) VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
    const valores = [dados.paciente_id, dados.exame_id, dados.protocolo_id, dados.data_inicio, dados.data_agendado, dados.status];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Editar(id, dados) {
    const sql = `UPDATE agendamentos SET paciente_id = ?, exame_id = ?, protocolo_id = ?, data_inicio = ?, data_agendado = ?, status = ? WHERE id = ? RETURNING *`;
    const valores = [dados.paciente_id, dados.exame_id, dados.protocolo_id, dados.data_inicio, dados.data_agendado, dados.status, id];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Excluir(id) {
    const sql = `DELETE FROM agendamentos WHERE id = ? RETURNING *`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
