import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export async function search({ usuario, nombre, apellido, idrol , id_tenant}) {
    return await UserModel.search(usuario, nombre, apellido, idrol , id_tenant);
}

export async function getById(id) {
    return await UserModel.getById(id);
}

export async function getByName(usuario) {
    return await UserModel.getByName(usuario);
}

export async function getByEmail(email) {
    return await UserModel.getByEmail(email);
}

export async function post({ nombre, apellido, usuario, passwordHash, empresa, email, activo = 1, id_tenant = null }) {
    return await UserModel.post(nombre, apellido, usuario, passwordHash, empresa, email, activo, id_tenant);
}

export async function remove(idusuario) {
    return await UserModel.delete(idusuario);
}

export async function update({idusuario, id_tenant, nombre , apellido, email, idrol }){
    return await UserModel.put(idusuario, id_tenant, nombre , apellido, email, idrol);
}

export async function verifyPassword(hash, plain) {
    return await bcrypt.compare(plain, hash);
}

export async function updatePassword(idusuario, newHash) {
    return await UserModel.updatePassword(idusuario, newHash);
}

export async function activate(idusuario) {
    return await UserModel.activate(idusuario);
}
