import { pool } from '../config/db';

class ProductModel {

  static async search(name: string, description: string, id_state: number, id_category: number, id_tenant:number) {
      const sql = `
          SELECT p.*, s.name as state, c.name as category
          FROM products as p 
          INNER JOIN categories c ON c.idcategory = p.idcategory
          INNER JOIN states s ON s.idstate = p.id_state
          WHERE (p.name ILIKE '%' || $1 || '%' OR $1 IS NULL)
          AND (p.description ILIKE '%' || $2 || '%' OR $2 IS NULL)
          AND (p.id_state = $3 OR $3 IS NULL)
          AND (p.id_category = $4 OR $4 IS NULL)
          AND p.id_tenant = $5
          `;
      const { rows } = await pool.query(sql, [name, description, id_state, id_category, id_tenant]);
      return rows;
  }

  static async getById(id: number, id_tenant: number) {
    const sql = `SELECT p.*, s.name as state, c.name as category
                FROM products p
                INNER JOIN categories c ON c.idcategory = p.idcategory
                INNER JOIN states s ON s.idstate = p.id_state
                WHERE p.idproduct = $1 AND p.id_tenant = $2`;
    const { rows } = await pool.query(sql, [id, id_tenant]);
    return rows[0] || null;
  }

  static async remove(id: number, id_tenant: number) {
    const sql = "UPDATE products SET active = false WHERE idproduct = $1 AND id_tenant = $2 RETURNING *";
    await pool.query(sql, [id, id_tenant]);
    return true;
  }

  static async post(name: string, description: string, cost: number, price: number, id_state: number, id_category: number, id_tenant: number) {
    const sql = 'INSERT INTO products (name, description, cost, price, id_state, id_category, id_tenant) VALUES ($1, $2, $3 ,$4 ,$5 , $6, $7) RETURNING *';
    const {rows} = await pool.query(sql, [name, description, cost, price, id_state, id_category, id_tenant]);
    return rows[0];
  }

  static async put(id: number, name: string, description: string, cost: number, price: number, id_state: number, id_category: number, id_tenant: number) {
    const sql = `UPDATE products SET
                  name      = COALESCE($2, name), 
                  description = COALESCE($3, description), 
                  cost      = COALESCE($4, cost), 
                  price     = COALESCE($5, price), 
                  id_state  = COALESCE($6, id_state), 
                  id_category = COALESCE($7, id_category)
                  WHERE idproduct = $1 and id_tenant = $8 RETURNING *`;
    const {rows} = await pool.query(sql, [id, name, description, cost, price, id_state, id_category, id_tenant]);
    return rows[0];
  }

}
export default ProductModel;
