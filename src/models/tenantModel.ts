import { pool } from '../config/db';

class TenantModel {
  static async post(empresa:string) {
    const sql = 'INSERT INTO tenants (empresa) VALUES ($1) RETURNING *';
    const { rows } = await pool.query(sql, [empresa]);
    return rows[0];
  }

  static async getByName(empresa:string) {
    const sql = `SELECT * FROM tenants t WHERE t.empresa = $1`;
    const { rows } = await pool.query(sql, [empresa]);
    return rows[0] || null;
  }
}

export default TenantModel;
