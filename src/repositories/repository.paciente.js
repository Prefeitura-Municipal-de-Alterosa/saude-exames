import { execute } from "../database/sqlite.js";

async function Listar() {
    const sql = `SELECT * FROM pacientes ORDER BY nome`;
    const pacientes = await execute(sql);
    return pacientes;
}

async function Inserir(paciente) {
    const sql = `
        INSERT INTO pacientes 
        (nome, endereco, telefone, data_nascimento, cpf) 
        VALUES (?, ?, ?, ?, ?) 
        RETURNING *`;
        
    const valores = [
        paciente.nome,
        paciente.endereco,
        paciente.telefone,
        paciente.data_nascimento,
        paciente.cpf
    ];
    
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Editar(id_paciente, dados) {
    const sql = `
        UPDATE pacientes
        SET nome = ?, endereco = ?, telefone = ?, data_nascimento = ?, cpf = ?
        WHERE id = ?
        RETURNING *`;
        
    const valores = [
        dados.nome,
        dados.endereco,
        dados.telefone,
        dados.data_nascimento,
        dados.cpf,
        id_paciente
    ];
    
    const resultado = await execute(sql, valores);
    return resultado[0];
}

async function Excluir(id_paciente) {
    const sql = `DELETE FROM pacientes WHERE id = ?`;
    await execute(sql, [id_paciente]);
}

async function ListarPorId(nome) {
    console.log("nome paciente:", nome);

    const sql = `SELECT * FROM pacientes WHERE nome LIKE ?`;
    const paciente = await execute(sql, [`%${nome}%`]);
    return paciente;
}

export default {
    Listar,
    Inserir,
    Editar,
    Excluir,
    ListarPorId
};
