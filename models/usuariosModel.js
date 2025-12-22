import { pool } from '../config/db.js';

export default class Usuarios {
    
    static async post(nombre, apellido, usuario, password, empresa, email, idrol, id_tenant) {
      const sql = 'INSERT INTO usuarios (nombre, apellido, usuario, password, empresa, email, idrol, id_tenant) VALUES ($1, $2, $3 ,$4 ,$5 , $6, $7, $8) RETURNING *';
      const {rows} = await pool.query(sql, [nombre, apellido, usuario, password, empresa, email, idrol, id_tenant]);
      return rows[0];
    }
    
    static async search({usuario, nombre, apellido, idrol, id_tenant}) {
        const sql = `
            SELECT u.idusuario, u.usuario, u.nombre, u.apellido, r.descripcion as rol
            FROM usuarios u 
            INNER JOIN roles r ON r.idrol = u.idrol
            WHERE (u.usuario = $1 OR $1 IS NULL)
            AND (u.nombre = $2 OR $2 IS NULL)
            AND (u.apellido = $3 OR $3 IS NULL)
            AND (u.idrol = $4 OR $4 IS NULL)
            AND u.id_tenant = $5
            AND u.activo = 1`;
        const { rows } = await pool.query(sql, [usuario, nombre, apellido, idrol, id_tenant]);
        return rows;
    }

    static async get({idusuario, id_tenant}) {
        const sql = 'SELECT * FROM usuarios WHERE idusuarios = $1 AND id_tenant = $2 AND activo = 1';
        const { rows } = await pool.query(sql, [idusuario, id_tenant]);
        return rows[0];
    }

//   static async put(cliente) {
//     const { idcliente, nombre, apellido, telefono, email, documento } = cliente;
//     const sql = `UPDATE clientes
//         SET
//         nombre = COALESCE($2, nombre), 
//         apellido = COALESCE($3, apellido), 
//         telefono = COALESCE($4, telefono), 
//         email = COALESCE($5, email), 
//         documento = COALESCE($6, documento)  
//         WHERE idcliente = $1 RETURNING *`;
//     const {rows} = await pool.query(sql, [idcliente, nombre, apellido, telefono, email, documento]);
//     return rows[0];
//   }

//   static async delete(idcliente) {
//     const sql = 'UPDATE clientes SET activo = 0 WHERE idcliente = $1';
//     await pool.query(sql, [idcliente]);
//     return { message: 'Cliente eliminado exitosamente.' };
//   }


}
