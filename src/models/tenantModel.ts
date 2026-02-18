import { pool } from '../config/db';

class TenantModel {
  static async post(name:string, slug:string) {
    const sql = 'INSERT INTO tenants (name, slug) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(sql, [name, slug]);
    return rows[0];
  }

  static async getByName(name:string) {
    const sql = `SELECT * FROM tenants t WHERE t.name = $1`;
    const { rows } = await pool.query(sql, [name]);
    return rows[0] || null;
  }
}

export default TenantModel;
