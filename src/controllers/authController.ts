import * as AuthService from '../services/authService';
import { HttpRequest } from '@/types/HttpRequest';
import { HttpResponse } from '@/types/HttpResponse';

export async function login(req: HttpRequest, res: HttpResponse){
  
  if(!req.body.usuario) return res.status(400).json({ success: false, message: 'User name is requerid.' });
  if(!req.body.password) return res.status(400).json({ success: false, message: 'Password is requerid.' });

  try {
    const result  = await  AuthService.login(req.body);
    console.log('Login result:', result);

    if (result.success && result.token) {
      res.cookie('access_token', result.token, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT,
        sameSite: 'lax',
        path: '/',
        maxAge: 28800 * 1000, // 8 hours
      });
    }
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in the login process.' });
  }
}

export async function post(req: HttpRequest, res: HttpResponse) {
  try {
    const result = await AuthService.register(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to create user.' });
  }
}

export async function activate(req: HttpRequest, res: HttpResponse) {
  const token = req.query.token;
  if(!token) {
    return  res.status(400).json({ message: 'Token is required.' });
  }
  try {
    const result = await AuthService.activate(token);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to actived user.' });
  }
}

export async function recoveryPassword(req: HttpRequest, res: HttpResponse) {
  try {
    const result = await AuthService.recoveryPassword(req.body.email);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error to recovery password.' });
  }
}
