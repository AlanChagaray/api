import { pool } from '../config/db.js';

export default class Cliente {

  static async get(idcliente) {
    const sql = 'SELECT * FROM clientes WHERE idcliente = $1 AND activo = 1';
    const { rows } = await pool.query(sql, [idcliente]);
    return rows[0];
  }

  static async search({ nombre, apellido, telefono }) {
    const sql = `
      SELECT * 
      FROM clientes 
      WHERE (nombre = $1 OR $1 IS NULL)
        AND (apellido = $2 OR $2 IS NULL)
        AND (telefono = $3 OR $3 IS NULL)
        AND activo = 1`;
    const { rows } = await pool.query(sql, [nombre, apellido, telefono]);
    return rows;
  }

  static async post(cliente) {
    const { nombre, apellido, documento, telefono, email } = cliente;
    const sql = 'INSERT INTO clientes (nombre, apellido, documento, telefono, email) VALUES ($1, $2, $3, $4,$5) RETURNING *';
    const {rows} = await pool.query(sql, [nombre, apellido, documento, telefono, email]);
    return rows[0];
  }

  static async put(cliente) {
    const { idcliente, nombre, apellido, telefono, email, documento } = cliente;
    const sql = `UPDATE clientes
        SET
        nombre = COALESCE($2, nombre), 
        apellido = COALESCE($3, apellido), 
        telefono = COALESCE($4, telefono), 
        email = COALESCE($5, email), 
        documento = COALESCE($6, documento)  
        WHERE idcliente = $1 RETURNING *`;
    const {rows} = await pool.query(sql, [idcliente, nombre, apellido, telefono, email, documento]);
    return rows[0];
  }

  static async delete(idcliente) {
    const sql = 'UPDATE clientes SET activo = 0 WHERE idcliente = $1';
    await pool.query(sql, [idcliente]);
    return { message: 'Cliente eliminado exitosamente.' };
  }


}
