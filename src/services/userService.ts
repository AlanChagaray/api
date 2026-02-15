import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';
import { Register, User} from '@/types/User';
import { generateToken, verifyToken } from './tokenService';
import { sendCreatePassword, sendRecoveryEmail} from './mailService';

export async function search({ usuario, nombre, apellido, idrol , id_tenant}: any) : Promise<User[] | null> {
    return await UserModel.search(usuario, nombre, apellido, idrol , id_tenant);
}

export async function getById(id: number) : Promise<User | null> {
    return await UserModel.getById(id);
}

export async function getByName(usuario: string) : Promise<User | null> {
    return await UserModel.getByName(usuario);
}

export async function getByEmail(email: string) : Promise<User | null> {
    return await UserModel.getByEmail(email);
}

export async function post({ nombre, apellido, usuario, passwordHash = null, empresa, email, idrol,  id_tenant = null }: any) : Promise<User> {
    return await UserModel.post(nombre, apellido, usuario, passwordHash, empresa, email, idrol,  id_tenant);
}

export async function createUserByAdmin(admin:User, {nombre, apellido, usuario, email, idrol} : Register) {
  
    if(admin.idrol !== 1) {
        return { status: 400, message: 'Denegade permissions.' };
    }

    const user = await post({ nombre, apellido, usuario, passwordHash: null, empresa: admin.empresa, email, idrol, id_tenant: admin.id_tenant } );
    console.log('Created success user:', user);
    const token = generateToken({
        idusuario : user.idusuario,
        usuario   : user.usuario,
        type    : 'create_password',
    }, '24h');

    if(!token){
        return { status: 500, message: 'Error generating token.' };
    }
    try {
        await sendCreatePassword(email, usuario, token);
        console.log('Create password email sent to:', email);
    } catch (error) {
        console.log('Error sending create password email:', error);
    }
    return { status: 200, message: 'User created successfully.', user, token};
}

export async function setPasswordAndActivateUser(token: string, password : string) {
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
        return { status: 400, message: 'Invalid or expired token.' };
    }
    console.log('Decoded token:', decoded);
    const user = await getById(decoded.idusuario);
    if (!user) {
        return { status: 400, message: 'User not found.' };
    }
    if (user.activo === 1) {
        return { status: 200, message: 'User already activated.' };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    return await setPasswordAndActivate(decoded.idusuario, passwordHash);
}

export async function setRecoveryPassword(idusuario: number, email: string) {
    const token = generateToken({
        idusuario,
        email,
        type    : 'recovery_password',
    }, '24h');
    if(!token){
        return { status: 500, message: 'Error generating token.' };
    }
    try {        
        await sendRecoveryEmail(email, email, token);
        console.log('Recovery password email sent to:', email);
    } catch (error) {
        console.log('Error sending recovery password email:', error);
    }
    return { status: 200, message: 'Recovery password email sent successfully.', token };
}

export async function updatePassword(newPassword: string, token: string) {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
        return { status: 400, message: 'Invalid or expired token.' };
    }
    const idusuario = decoded.idusuario;
    if (!idusuario) {
        return { status: 400, message: 'Invalid token.' };
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    return await UserModel.updatePassword(idusuario, passwordHash);
}

export async function remove(idusuario: number) {
    return await UserModel.deleteById(idusuario);
}

export async function update({idusuario, id_tenant, usuario = null, nombre = null , apellido = null, email = null, idrol = null }: any): Promise<User | null> {
    return await UserModel.put(idusuario, id_tenant, usuario, nombre , apellido, email, idrol);
}

export async function verifyPassword(hash: string, plain: string ) : Promise<boolean> {
    return await bcrypt.compare(plain, hash);
}

export async function activate(idusuario: number) : Promise<User | null> {
    return await UserModel.activate(idusuario);
}

export async function setPasswordAndActivate(idusuario: number, passwordHash: string) : Promise<User | null> {
    return await UserModel.setPasswordAndActive(idusuario, passwordHash);
}
