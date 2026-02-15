import { pool } from '../config/db';

class Auth {

  static async get(usuario: string) {
    const sql = `
      SELECT u.usuario, u.password, u.id_tenant, u.empresa,  r.descripcion as rol
      FROM usuarios u
      INNER JOIN roles r on r.idrol = u.idrol 
      WHERE u.usuario = $1 AND u.activo = 1
    `;
    const { rows } = await pool.query(sql, [usuario]);
    return rows[0] || null;
  }

  static async getById(idusuario: number) {
    const sql = `SELECT * FROM usuarios u WHERE u.idusuario = $1`;
    const { rows } = await pool.query(sql, [idusuario]);
    return rows[0] || null;
  }

  static async getByEmail(email: string) {
    const sql = `SELECT * FROM usuarios u WHERE u.email = $1 AND u.activo = 1`;
    const { rows } = await pool.query(sql, [email]);
    return rows[0] || null;
  }

  static async deleteById(idusuario: number) {
    const sql = "DELETE FROM usuarios WHERE idusuario = $1 RETURNING *";
    await pool.query(sql, [idusuario]);
    return true;
  }

  static async activate(idusuario: number) {
    const sql = "UPDATE usuarios SET activo = 1 WHERE idusuario = $1 RETURNING *";
    const { rows } = await pool.query(sql, [idusuario]);
    return rows[0] || null;
  }

  static async tenant_post(empresa: string) {
    const sql = 'INSERT INTO tenants (empresa) VALUES ($1) RETURNING *';
    const {rows} = await pool.query(sql, [empresa]);
    return rows[0];
  }

  static async post(nombre: string, apellido: string, usuario: string, password: string, email: string, empresa: string, idrol: number ,id_tenant: number) {
    const sql = 'INSERT INTO usuarios (nombre, apellido, usuario, password, empresa, email, idrol, id_tenant, activo) VALUES ($1, $2, $3 ,$4 ,$5 , $6, $7, $8, $9) RETURNING *';
    const {rows} = await pool.query(sql, [nombre, apellido, usuario, password, email, empresa, idrol, id_tenant, 0]);
    return rows[0];
  }
}

export default Auth;
