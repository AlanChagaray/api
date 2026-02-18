import * as ProductService from '../services/productService';
import { HttpRequest } from '@/types/HttpRequest';
import { HttpResponse } from '@/types/HttpResponse';

export async function search(req: HttpRequest, res: HttpResponse) {
  const { name, description, id_state, id_category } = req.query;
  const id_tenant = req.user?.id_tenant; 
  console.log('id_tenant from token:', id_tenant);
  try {
    const products = await ProductService.search({ name, description, id_state, id_category, id_tenant });
    return products == null ? res.status(200).json({ message: 'No products found.' }) : res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error search products.' });
  }
}

export async function getById(req: HttpRequest, res: HttpResponse) {
  const { id } = req.params;
  const id_tenant = req.user?.id_tenant; 

  try {
    const product = await ProductService.getById(id, id_tenant);
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error find product.' });
  }
}

export async function post(req: HttpRequest, res: HttpResponse) {
  const { name, description, cost, price, id_state, id_category} = req.body;
  let id_tenant     = req.user?.id_tenant;
  console.log('id_tenant from token:', id_tenant);
  try {
    const response = await ProductService.post({ name, description, cost, price, id_state, id_category, id_tenant });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to create product.' });
  }
}

export async function remove(req: HttpRequest, res: HttpResponse) {
  const { id } = req.params;
  const id_tenant = req.user?.id_tenant;

  try {
    const response = await ProductService.remove(id, id_tenant);
    return res.status(200).json({message: 'Product deleted successfully.', response});
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to delete product.' });
  }
}

export async function put(req: HttpRequest, res: HttpResponse) {
  const id = parseInt(req.params.id);
  const { name, description, cost, price, id_state, id_category } = req.body;

  if(!id) {
    return res.status(400).json({ message: 'id is required.' });
  }

  let id_tenant = req.user?.id_tenant;
  try {
    const response = await ProductService.update({ id, name, description, cost, price, id_state, id_category, id_tenant });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to update product.' });
  }
}
