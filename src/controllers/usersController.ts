import bcrypt from 'bcrypt';
import * as UserService from '../services/userService';
import { HttpRequest } from '@/types/HttpRequest';
import { HttpResponse } from '@/types/HttpResponse';

export async function search(req: HttpRequest, res: HttpResponse) {
  const { usuario, nombre, apellido, idrol } = req.query;
  const id_tenant = req.user?.id_tenant; 
  console.log('id_tenant from token:', id_tenant);
  try {
    const users = await UserService.search({ usuario, nombre, apellido, idrol, id_tenant });
    return users == null ? res.status(200).json({ message: 'No users found.' }) : res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error search users.' });
  }
}

export async function getById(req: HttpRequest, res: HttpResponse) {
  const { id } = req.params;

  try {
    const user = await UserService.getById(id);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error find user.' });
  }
}

export async function post(req: HttpRequest, res: HttpResponse) {
  const { nombre, apellido, usuario, password, email, idrol } = req.body;
  const hash        = await bcrypt.hash(password, 10);
  let id_tenant     = req.user?.id_tenant;
  let empresa_tenant = req.user?.empresa;

  console.log('id_tenant from token:', id_tenant);
  try {
    const response = await UserService.post({ nombre, apellido, usuario, passwordHash: hash, empresa: empresa_tenant, email, idrol, id_tenant });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to create user.' });
  }
}

export async function remove(req: HttpRequest, res: HttpResponse) {
  const { id } = req.params;

  try {
    const response = await UserService.remove(id);
    return res.status(200).json({message: 'User deleted successfully.', response});
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to delete user.' });
  }
}

export async function put(req: HttpRequest, res: HttpResponse) {
  const { idusuario, nombre, apellido, email, idrol } = req.body;

  if(!idusuario) {
    return res.status(400).json({ message: 'idusuario is required.' });
  }

  let id_tenant = req.user?.id_tenant;
console.log('body update:', req.body);
  try {
    const response = await UserService.update({ idusuario, id_tenant, nombre, apellido, email, idrol });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to update user.' });
  }
}

export async function createUserByAdmin(req: HttpRequest, res: HttpResponse) {
  const admin = req.user;
  const { nombre, apellido, usuario, email, idrol } = req.body;
  try {
    const result = await UserService.createUserByAdmin(admin, { nombre, apellido, usuario, email, idrol });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to create user by admin.' });
  }
}

export async function setPasswordAndActivateUser(req: HttpRequest, res: HttpResponse) {
  const token         = req.query.token as string;
  const { password }  = req.body;
  if(!token || !password) {
    return res.status(400).json({ message: 'Token and password are required.' });
  }
  try {
    const result = await UserService.setPasswordAndActivateUser(token,  password);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to set password and activate user.' });
  }
}

export async function updatePassword(req: HttpRequest, res: HttpResponse) {
  const token         = req.query.token as string;
  const { newPassword } = req.body;
  
  if(!newPassword) {
    return res.status(400).json({ message: 'newPassword is required.' });
  }

  try {
    const result = await UserService.updatePassword(newPassword, token);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to update password.' });
  }
}