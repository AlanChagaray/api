import { pool } from '../config/db';

class RolePermissionModel {

  static async post(id_role: number, id_tenant: number) {
    const sql = 'INSERT INTO role_permissions (id_role, id_tenant) VALUES ($1, $2) RETURNING *';
    const {rows} = await pool.query(sql, [id_role, id_tenant]);
    return rows[0];
  }
}

export default RolePermissionModel;
