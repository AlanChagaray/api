import bcrypt from 'bcrypt';
import { sendWelcomeEmail, sendRecoveryEmail } from './mailService.js';
import { generateToken, verifyToken } from './tokenService.js';
import * as UserService from './userService.js';
import * as TenantService from './tenantService.js';


export async function login({ usuario, password }) {
  const user    = await UserService.getByName(usuario);
  console.log('user:',user);    

  if (!user) {
    return { status: 400, message: 'Usuario no encontrado.' };
  }
  const isValid = await UserService.verifyPassword(user.password, password);
  if (!isValid) {
    return { status: 400, message: 'Contraseña incorrecta' };
  }
  const token = generateToken({
    id        : user.idusuario,
    usuario   : user.usuario,
    rol       : user.rol,
    id_tenant : user.id_tenant,
    empresa   : user.empresa
  }, '600s');
  return {
    success   : true,
    status    : 200,
    idusuario : user.idusuario,
    usuario   : user.usuario,
    rol       : user.rol,
    id_tenant : user.id_tenant,
    empresa   : user.empresa,
    token
  };
}

export async function register({ nombre, apellido, usuario, password, email, empresa }) {
  const salt_rounds = 10;
  const hash        = await bcrypt.hash(password, salt_rounds);
  let id_tenant     = null;
  
  try {
    const existingTenant = await TenantService.getByName(empresa);
    if (existingTenant) {
      return { status: 400, message: 'El nombre de empresa ya está registrada.' };
    }
    const tenant    = await TenantService.createTenant(empresa);
    id_tenant       = tenant.id_tenant;
  } catch (error) {
    return { status: 400, message: 'Error al crear nueva empresa.' };
  }
  const user = await UserService.createUser({ nombre, apellido, usuario, passwordHash: hash, empresa, email, activo: 1, id_tenant });
  
  try {
    await sendWelcomeEmail(email, usuario, user.idusuario);
  } catch (error) {
    await UserService.deleteUser(user.idusuario);
    return { status: 400, message: 'Error al enviar email' };
  }
  return { status: 200, ...user };
}

export async function activate(token) {
  if (!token) {
    return { status: 400, message: 'Token requerido.' };
  }
  try {
    const decoded = verifyToken(token);
    const user = await UserService.getById(decoded.idusuario);
    if (!user) {
      return { status: 400, message: 'Usuario no encontrado.' };
    }
    if (user.activo === 1) {
      return { status: 200, message: 'Usuario ya se encuentra activado.' };
    }
    await UserService.activateUser(user.idusuario);
    return { status: 200, message: 'Usuario activado exitosamente.' };
  } catch (error) {
    return { status: 400, message: 'Token invalido o expirado.' };
  }
}

export async function recoveryPassword(email) {
  const user = await UserService.getByEmail(email);
  if (!user) {
    return { status: 400, message: 'No se encuentra email registrado.' };
  }
  try {
    await sendRecoveryEmail(email, user.usuario, user.idusuario);
  } catch (error) {
    return { status: 400, message: 'Error al enviar email' };
  }
  return { status: 200, message: 'Email de recuperación enviado.' };
}