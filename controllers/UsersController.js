import * as UserService from '../services/userService.js';
import bcrypt from 'bcrypt';

export async function search(req, res) {
  const { usuario, nombre, apellido, idrol } = req.query;
  const id_tenant = req.user?.id_tenant; // viene del JWT si ya hay sesión

  try {
    const response = await UserService.search({ usuario, nombre, apellido, idrol, id_tenant });
    return response == null ? res.status(200).json({ message: 'No hay clientes registrados.' }) : res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al buscar usuarios.' });
  }
}

export async function get(req, res) {
  const { idusuario } = req.params;
  try {
    const usuario = await UserService.getById(idusuario);
    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al obtener usuario.' });
  }
}

export async function post(req, res) {
  const { nombre, apellido, usuario, password, email, idrol } = req.body;
  const salt_rounds = 10;
  const hash = await bcrypt.hash(password, salt_rounds);
  let id_tenant = req.user?.id_tenant; // viene del JWT si ya hay sesión
  let empresa_tenant = req.user?.empresa; // también del JWT

  try {
    // Service espera passwordHash y empresa
    const response = await UserService.post({ nombre, apellido, usuario, passwordHash: hash, empresa: empresa_tenant, email, idrol, id_tenant });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al crear nuevo usuario.' });
  }
}

export async function remove(req, res) {
  const { idusuario } = req.params;
  try {
    const response = await UserService.remove(idusuario);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al eliminar usuario.' });
  }
}

export async function put(req, res) {
  const { idusuario, nombre, apellido, email, idrol } = req.body;
  let id_tenant = req.user?.id_tenant; // viene del JWT si ya hay sesión

  try {
    const response = await UserService.update({ idusuario, id_tenant, nombre, apellido, email, idrol });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al editar usuario.' });
  }
}
