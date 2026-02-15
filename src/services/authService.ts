import bcrypt from 'bcrypt';
import { sendWelcomeEmail, sendRecoveryEmail } from './mailService';
import { generateToken, verifyToken } from './tokenService';
import * as UserService from './userService';
import * as TenantService from './tenantService';
import { Auth } from '@/types/Auth';
import { User } from '@/types/User';
import Login from '@/types/Login';


export async function login({ usuario, password } : Login) : Promise<Auth> {
  const user    = await UserService.getByName(usuario);
  
  console.log('user:',user);
  if (!user) return { status: 400, message: 'User not found' };
  
  const isValid = await UserService.verifyPassword(user.password, password);
  if (!isValid) return { status: 400, message: 'Password incorrect' };
  
  const token = generateToken({
    idusuario : user.idusuario,
    usuario   : user.usuario,
    idrol     : user.idrol,
    rol       : user.rol,
    id_tenant : user.id_tenant,
    empresa   : user.empresa
  }, '600s');

  return {
    success   : true,
    status    : 200,
    idusuario : user.idusuario,
    usuario   : user.usuario,
    idrol     : user.idrol,
    rol       : user.rol,
    id_tenant : user.id_tenant,
    empresa   : user.empresa
  , token };
}

export async function register({ nombre, apellido, usuario, password, email, empresa }: User) {
  let id_tenant     = null;
  
  try {
    const existingTenant = await TenantService.getByName(empresa);
    if (existingTenant) {
      return { status: 400, message: 'Company name already registered' };
    }
    const tenant  = await TenantService.createTenant(empresa);
    id_tenant     = tenant.id_tenant;
  } catch (error) {
    return { status: 400, message: 'Error creating new company.' };
  }
  
  const hash  = await bcrypt.hash(password, 10);
  const user  = await UserService.post({ nombre, apellido, usuario, passwordHash: hash, empresa, email, idrol: 1, activo: 1, id_tenant } );
  if(user === null) {
    return { status: 400, message: 'Error creating new user.' };
  }
  try {
    await sendWelcomeEmail(email, usuario, user.idusuario);
  } catch (error) {
    await UserService.remove(user.idusuario);
    return { status: 400, message: 'Error send email' };
  }
  return { status: 200, ...user };
}

export async function activate(token: string) {
  try {
    const decoded = verifyToken(token);
    const user    = await UserService.getById(decoded.idusuario);
    if (!user) {
      return { status: 400, message: 'User not found.' };
    }
    if (user.activo === 1) {
      return { status: 200, message: 'User already activated.' };
    }
    await UserService.activate(user.idusuario);
    return { status: 200, message: 'User activated successfully.' };
  } catch (error) {
    return { status: 400, message: 'Token invalid or expired.' };
  }
}

export async function recoveryPassword(email: string) {
  const user = await UserService.getByEmail(email);
  
  if (!user) {
    return { status: 400, message: 'Email not registered.' };
  }

//   const token = generateToken({
//     idusuario : user.idusuario,
//     usuario   : user.usuario,
//     type    : 'reovery_password',
// }, '24h');

  try {
    await UserService.setRecoveryPassword(user.idusuario, email);
    // await sendRecoveryEmail(email, user.usuario, token);
  } catch (error) {
    return { status: 400, message: 'Error sending email' };
  }
  return { status: 200, message: 'Email recovery sent successfully.' };
}