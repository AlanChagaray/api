import { pool } from '../config/db';

class RoleModel {

  static async post(name: string, description: string, id_tenant: number) {
    const sql = 'INSERT INTO roles (name, description, id_tenant) VALUES ($1, $2, $3) RETURNING *';
    const {rows} = await pool.query(sql, [name, description, id_tenant]);
    return rows[0];
  }
}

export default RoleModel;
