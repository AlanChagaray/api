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

export async function getByName(username: string) : Promise<User | null> {
    return await UserModel.getByName(username);
}

export async function getByEmail(email: string) : Promise<User | null> {
    return await UserModel.getByEmail(email);
}

export async function post({ username, first_name, last_name, password = null,  email, id_role,  id_tenant = null }: any) : Promise<User> {
    return await UserModel.post(username, first_name, last_name, password, email, id_role,  id_tenant);
}

export async function createUserByAdmin(admin:User, {username, first_name, last_name, email, id_role} : Register) {
  
    if(admin.id_role !== 1) {
        return { status: 400, message: 'Denegade permissions.' };
    }

    const user = await post({ username, first_name, last_name, passwordHash: null, email, id_role, id_tenant: admin.id_tenant } );
    console.log('Created success user:', user);
    const token = generateToken({
        id        : user.id,
        username  : user.username,
        type      : 'create_password',
    }, '24h');

    if(!token){
        return { status: 500, message: 'Error generating token.' };
    }
    try {
        await sendCreatePassword(email, username, token);
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
    const user = await getById(decoded.id);
    if (!user) {
        return { status: 400, message: 'User not found.' };
    }
    if (user.active === 1) {
        return { status: 200, message: 'User already activated.' };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    return await setPasswordAndActivate(decoded.id, passwordHash);
}

export async function setRecoveryPassword(id: number, email: string) {
    const token = generateToken({
        id,
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

export async function updatePassword(password: string, token: string) {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
        return { status: 400, message: 'Invalid or expired token.' };
    }
    const id = decoded.id;
    if (!id) {
        return { status: 400, message: 'Invalid token.' };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return await UserModel.updatePassword(id, passwordHash);
}

export async function remove(id: number) {
    return await UserModel.deleteById(id);
}

export async function update({id, username = null, first_name = null, last_name = null,  email = null, id_role = null, id_tenant }: any): Promise<User | null> {
    return await UserModel.put(id, username, first_name, last_name, email, id_role, id_tenant);
}

export async function verifyPassword(hash: string, plain: string ) : Promise<boolean> {
    return await bcrypt.compare(plain, hash);
}

export async function activate(id: number) : Promise<User | null> {
    return await UserModel.activate(id);
}

export async function setPasswordAndActivate(id: number, password: string) : Promise<User | null> {
    return await UserModel.setPasswordAndActive(id, password);
}
