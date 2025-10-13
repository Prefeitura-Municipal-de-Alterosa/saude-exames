import { execute } from "../database/sqlite.js";

async function Listar() {
    const sql = `SELECT * FROM arexames ORDER BY id_pacientecpf`;
    return await execute(sql);
}

async function Pesquisar(dados) {
    let sql = `SELECT * FROM arexames WHERE 1=1`;
    const valores = [];

    if (dados.nome) {
        sql += " AND id_pacientecpf LIKE ?";
        valores.push(`%${dados.nome}%`);
    }

    if (dados.exame) {
        sql += " AND id_exame LIKE ?";
        valores.push(`%${dados.exame}%`);
    }

    if (dados.finalizado !== undefined) {
        sql += " AND finalizado = ?";
        valores.push(dados.finalizado);
    }

    const resultado = await execute(sql, valores);
    return resultado;
}


async function Inserir(dados) {
    console.log("📄 Arquivo recebido:", {
        nomeOriginal: dados.arquivo.originalname,
        nomeSalvo: dados.arquivo.filename,
        tipo: dados.arquivo.mimetype,
        tamanho: dados.arquivo.size,
        Nomepaciente: dados.nome,
        Exame: dados.exame,
        FinalizadoData: dados.finalizado


    });
    const sql = `INSERT INTO arexames (id_pdf, id_pacientecpf, id_exame, finalizado) VALUES (?, ?, ?, ?) RETURNING *`;
    const valores = [dados.arquivo.filename, dados.nome, dados.exame, dados.finalizado]; // array com ambos os valores
    const resultado = await execute(sql, valores);
    return resultado[0];

}

async function Editar(id, dados) {
    const sql = `UPDATE arexames SET id_pacientecpf = ?, id_exame =?, finalizado=?  WHERE id = ? RETURNING *`;
    const valores = [dados.id_pacientecpf, dados.exame, dados.finalizado, id];
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Excluir(id) {
    const sql = `DELETE FROM arexames WHERE id = ? RETURNING *`;
    const resultado = await execute(sql, [id]);
    return resultado[0];
}

export default { Listar, Pesquisar, Inserir, Editar, Excluir };
