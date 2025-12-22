// import jwt from 'jsonwebtoken';
import Usuarios from '../models/usuariosModel.js';
import bcrypt from 'bcrypt';

// const API_KEY = process.env.JWT_SECRET || '@dMinSysTem';
export async function search(req, res) {
    const { usuario, nombre, apellido, idrol } = req.query;
    let id_tenant = req.user?.id_tenant; // viene del JWT si ya hay sesión

    try {
        const response = await Usuarios.search({ usuario, nombre, apellido, idrol , id_tenant});
          if(response == null){
                return res.status(200).json({ message: 'No hay clientes registrados.' });
          }
        return res.json(response);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al buscar usuarios.' });
    }
}

export async function get(req, res) {
  const { idusuario } = req.params;
  try {
    const usuario = await Usuarios.get(idusuario);
    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al obtener usuario.' });
  }
}

export async function post(req, res) {
  const {nombre, apellido, usuario, password, email, idrol} = req.body;
  const salt_rounds   = 10; 
  const hash          = await bcrypt.hash(password, salt_rounds); 
  let id_tenant       = req.user?.id_tenant; // viene del JWT si ya hay sesión
  let empresa_tenant  = req.user?.empresa;     // también del JWT

  try {
    const response = await Usuarios.post(nombre, apellido, usuario, hash, empresa_tenant, email, idrol ,id_tenant);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error); 
    return res.status(400).json({ message: 'Error al crear nuevo usuario.' });
  }
}

export async function remove(req, res) {
  const {idusuario} = req.params;
  try {
    const response = await Usuarios.delete(idusuario);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error); 
    return res.status(400).json({ message: 'Error al eliminar usuario.' });
  }
}

export async function put(req, res) {
  const {idusuario, nombre, apellido, email, idrol} = req.body;
  let id_tenant       = req.user?.id_tenant; // viene del JWT si ya hay sesión
  
  try {
    const response = await Usuarios.put(idusuario, id_tenant, nombre, apellido, email, idrol);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error); 
    return res.status(400).json({ message: 'Error al editar usuario.' });
  }
}