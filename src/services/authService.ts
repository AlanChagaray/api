import bcrypt from 'bcrypt';
import { sendWelcomeEmail, sendRecoveryEmail } from './mailService';
import { generateToken, verifyToken } from './tokenService';
import * as UserService from './userService';
import * as TenantService from './tenantService';
import * as RoleService from './roleService';
import * as RolePermissionService from './rolePermissionService';
import { Auth } from '@/types/Auth';
import { User } from '@/types/User';
import Login from '@/types/Login';


export async function login({ username, password } : Login) : Promise<Auth> {
  const user    = await UserService.getByName(username);
  
  console.log('user:',user);
  if (!user) return { status: 400, message: 'User not found' };
  
  const isValid = await UserService.verifyPassword(user.password, password);
  if (!isValid) return { status: 400, message: 'Password incorrect' };
  
  const token = generateToken({
    id        : user.id,
    username  : user.username,
    id_role    : user.id_role,
    id_tenant : user.id_tenant
  }, '600s');

  return {
    success   : true,
    status    : 200,
    id        : user.id,
    username  : user.username,
    id_role   : user.id_role,
    id_tenant : user.id_tenant
  , token };
}

export async function singUp({ username, first_name, last_name, password, email, tenant_name }: User) {
  // try {
  //   const existingTenant = await TenantService.getByName(tenant_name);
  //   if (existingTenant) {
  //     return { status: 400, message: 'Company name already registered' };
  //   }
  //   const tenant  = await TenantService.createTenant(tenant_name);
    const tenant  = await TenantService.getByName(tenant_name);
  // } catch (error) {
  //   return { status: 400, message: 'Error creating new company.' };
  // }
  
  const role = await RoleService.post({ name: 'Admin', description: 'Administrator role', id_tenant: tenant.id });
  
  await RolePermissionService.post({ id_role: role.id, id_tenant: tenant.id });
 
  const passwordHash  = await bcrypt.hash(password, 10);
  const user          = await UserService.post({ username, first_name, last_name,  password: passwordHash,  email, id_role: 1, id_tenant: tenant.id } );
  console.log(user);
  if(user === null) {
    return { status: 400, message: 'Error creating new user.' };
  }
  try {
    await sendWelcomeEmail(email, username, user.id);
  } catch (error) {
    await UserService.remove(user.id);
    return { status: 400, message: 'Error send email' };
  }
  return { status: 200, ...user };
}

export async function activate(token: string) {
  try {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return { status: 400, message: 'Invalid or expired token.' };
    }
    const user    = await UserService.getById(decoded.id);
    if (!user) {
      return { status: 400, message: 'User not found.' };
    }
    if (user.active === 1) {
      return { status: 200, message: 'User already activated.' };
    }
    await UserService.activate(user.id);
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
    await UserService.setRecoveryPassword(user.id, email);
    // await sendRecoveryEmail(email, user.usuario, token);
  } catch (error) {
    return { status: 400, message: 'Error sending email' };
  }
  return { status: 200, message: 'Email recovery sent successfully.' };
}