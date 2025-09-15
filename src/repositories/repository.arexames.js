import { execute } from "../database/sqlite.js";

async function Listar() {
    const sql = `SELECT * FROM arexames ORDER BY id_pacientecpf`;
    return await execute(sql);
}

async function ListarPorId(id) {
    const sql = `SELECT * FROM arexames WHERE id = ?`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

async function Inserir(dados) {
    console.log("📄 Arquivo recebido:", {
        nomeOriginal: dados.arquivo.originalname,
        nomeSalvo: dados.arquivo.filename,
        tipo: dados.arquivo.mimetype,
        tamanho: dados.arquivo.size,
        Nomepaciente: dados.nome

    });
    const sql = `INSERT INTO arexames (id_pdf, id_pacientecpf) VALUES (?, ?) RETURNING *`;
    const valores = [dados.arquivo.filename, dados.nome]; // array com ambos os valores
    const resultado = await execute(sql, valores);
    return resultado[0];

}

async function Editar(id, dados) {
    const sql = `UPDATE arexames SET id_pacientecpf = ? WHERE id = ? RETURNING *`;
    const valores = [dados.id_pacientecpf, id];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Excluir(id) {
    const sql = `DELETE FROM arexames WHERE id = ? RETURNING *`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

export default { Listar, ListarPorId, Inserir, Editar, Excluir };
