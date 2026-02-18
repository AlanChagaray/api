import { pool } from '../config/db';

class UserModel {

  static async search(username:string , first_name:string, last_name:string, id_role:number , id_tenant:number) {
      const sql = `
          SELECT u.*, r.name as rol
          FROM users u 
          INNER JOIN roles r ON r.id = u.id_role
          WHERE (u.username = $1 OR $1 IS NULL)
          AND (u.first_name = $2 OR $2 IS NULL)
          AND (u.last_name = $3 OR $3 IS NULL)
          AND (u.id_role = $4 OR $4 IS NULL)
          AND u.id_tenant = $5
          `;
      const { rows } = await pool.query(sql, [username, first_name, last_name, id_role, id_tenant]);
      return rows;
  }

  static async getByName(username: string) {
    const sql = `
      SELECT u.*,  r.name as role
      FROM users u
      INNER JOIN roles r on r.id = u.id_role 
      WHERE u.username = $1 AND u.active = 1
    `;
    const { rows } = await pool.query(sql, [username]);
    return rows[0] || null;
  }

  static async getById(id: number) {
    const sql = `SELECT u.*,  r.name as role
                FROM users u
                INNER JOIN roles r on r.id = u.id_role 
                WHERE u.id = $1`;
    const { rows } = await pool.query(sql, [id]);
    return rows[0] || null;
  }

  static async getByEmail(email: string) {
    const sql = `SELECT * FROM users u WHERE u.email = $1 AND u.active = 1`;
    const { rows } = await pool.query(sql, [email]);
    return rows[0] || null;
  }

  static async deleteById(id: number) {
    const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    await pool.query(sql, [id]);
    return true;
  }

  static async activate(id: number) {
    const sql = "UPDATE users SET active = 1 WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(sql, [id]);
    return rows[0] || null;
  }

  static async setPasswordAndActive(id: number, passwordHash: string) {
    const sql = "UPDATE users SET password = $2, active = 1 WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(sql, [id, passwordHash]);
    return rows[0] || null;
  }

  static async updatePassword(id: number, passwordHash: string) {
    const sql = "UPDATE users SET password = $2 WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(sql, [id, passwordHash]);
    return rows[0] || null;
  }

  static async post(username: string,first_name: string, last_name: string,  password: string, email: string, id_role: number ,id_tenant: number) {
    const sql = 'INSERT INTO users (username, first_name, last_name, password, email, id_role, id_tenant, active) VALUES ($1, $2, $3 ,$4 ,$5 , $6, $7, $8) RETURNING *';
    const {rows} = await pool.query(sql, [username, first_name, last_name, password, email,  id_role, id_tenant, 0]);
    return rows[0];
  }

  static async put(id: number, username: string, first_name: string, last_name: string, email: string, id_role: number, id_tenant: number) {
    const sql = `UPDATE users SET
        username   = COALESCE($2, username), 
        first_name    = COALESCE($3, first_name), 
        last_name  = COALESCE($4, last_name), 
        email     = COALESCE($5, email), 
        id_role     = COALESCE($6, id_role)
        WHERE id = $1 and id_tenant = $7 RETURNING *`;
    const {rows} = await pool.query(sql, [id, username, first_name, last_name, email, id_role, id_tenant]);
    return rows[0];
  }

}
export default UserModel;
