import { pool } from '../config/db';

class UserModel {

  static async search(usuario:string , nombre:string, apellido:string, idrol:number , id_tenant:number) {
      const sql = `
          SELECT u.*, r.descripcion as rol
          FROM usuarios u 
          INNER JOIN roles r ON r.idrol = u.idrol
          WHERE (u.usuario = $1 OR $1 IS NULL)
          AND (u.nombre = $2 OR $2 IS NULL)
          AND (u.apellido = $3 OR $3 IS NULL)
          AND (u.idrol = $4 OR $4 IS NULL)
          AND u.id_tenant = $5
          `;
      const { rows } = await pool.query(sql, [usuario, nombre, apellido, idrol, id_tenant]);
      return rows;
  }

  static async getByName(usuario: string) {
    const sql = `
      SELECT u.idusuario, u.usuario, u.password, u.id_tenant, u.empresa, r.idrol,  r.descripcion as rol
      FROM usuarios u
      INNER JOIN roles r on r.idrol = u.idrol 
      WHERE u.usuario = $1 AND u.activo = 1
    `;
    const { rows } = await pool.query(sql, [usuario]);
    return rows[0] || null;
  }

  static async getById(id: number) {
    const sql = `SELECT u.usuario, u.password, u.id_tenant, u.empresa,  r.descripcion as rol
                FROM usuarios u
                INNER JOIN roles r on r.idrol = u.idrol 
                WHERE u.idusuario = $1`;
    const { rows } = await pool.query(sql, [id]);
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

  static async setPasswordAndActive(idusuario: number, passwordHash: string) {
    const sql = "UPDATE usuarios SET password = $2, activo = 1 WHERE idusuario = $1 RETURNING *";
    const { rows } = await pool.query(sql, [idusuario, passwordHash]);
    return rows[0] || null;
  }

  static async updatePassword(idusuario: number, passwordHash: string) {
    const sql = "UPDATE usuarios SET password = $2 WHERE idusuario = $1 RETURNING *";
    const { rows } = await pool.query(sql, [idusuario, passwordHash]);
    return rows[0] || null;
  }

  static async post(nombre: string, apellido: string, usuario: string, password: string, email: string, empresa: string, idrol: number ,id_tenant: number) {
    const sql = 'INSERT INTO usuarios (nombre, apellido, usuario, password, empresa, email, idrol, id_tenant, activo) VALUES ($1, $2, $3 ,$4 ,$5 , $6, $7, $8, $9) RETURNING *';
    const {rows} = await pool.query(sql, [nombre, apellido, usuario, password, email, empresa, idrol, id_tenant, 0]);
    return rows[0];
  }

  static async put(idusuario: number, id_tenant: number, usuario: string, nombre: string, apellido: string, email: string, idrol: number) {
    const sql = `UPDATE usuarios SET
        usuario   = COALESCE($3, usuario), 
        nombre    = COALESCE($4, nombre), 
        apellido  = COALESCE($5, apellido), 
        email     = COALESCE($6, email), 
        idrol     = COALESCE($7, idrol)
        WHERE idusuario = $1 and id_tenant = $2 RETURNING *`;
    const {rows} = await pool.query(sql, [idusuario , id_tenant , usuario , nombre, apellido, email, idrol]);
    return rows[0];
  }

}
export default UserModel;
