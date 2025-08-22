import { execute } from "../database/sqlite.js";

async function Listar() {
    const sql = `SELECT * FROM lista_atendimento ORDER BY agendamento_id`;
    return await execute(sql);
}
async function Listar_proximo() {
    const sql = `SELECT la.id AS id_fila,
       ag.id AS id_agendamento,
       p.nome,
       pm.cor,
       ag.exame_id
  FROM lista_atendimento la
  JOIN agendamentos ag          ON ag.id = la.agendamento_id
  JOIN pacientes    p           ON p.id  = ag.paciente_id
  JOIN protocolos_manchester pm ON pm.id = ag.protocolo_id
 WHERE la.chamado = 0
 ORDER BY la.prioridade, la.data_entrada
 LIMIT 1;`;
    return await execute(sql);
}

async function ListarPorId(id) {
    const sql = `SELECT * FROM lista_atendimento WHERE id = ?`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

async function Inserir(dados) {
    const sql = `INSERT INTO lista_atendimento (agendamento_id, prioridade, data_entrada, chamado) VALUES (?, ?, ?, ?) RETURNING *`;
    const valores = [dados.agendamento_id, dados.prioridade, dados.data_entrada, dados.chamado];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Editar(id, dados) {
    const sql = `UPDATE lista_atendimento SET agendamento_id = ?, prioridade = ?, data_entrada = ?, chamado = ? WHERE id = ? RETURNING *`;
    const valores = [dados.agendamento_id, dados.prioridade, dados.data_entrada, dados.chamado, id];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Editar_fila(id_fila, id_agendamento) {
    const sql1 = `UPDATE lista_atendimento
                  SET chamado = 1
                  WHERE id = ?`;
    const sql2 = `UPDATE agendamentos
                  SET data_agendado = date('now'),
                      status = 'MARCADO'
                  WHERE id = ?`;

    await execute(sql1, [id_fila]);
    const resultado = await execute(sql2, [id_agendamento]);
    return resultado[0]; // ou outro retorno que você deseje
}

async function Excluir(id) {
    const sql = `DELETE FROM lista_atendimento WHERE id = ? RETURNING *`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

export default { Listar_proximo, Listar, ListarPorId, Inserir, Editar, Editar_fila, Excluir };
