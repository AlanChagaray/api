import * as AuthService from '../services/authService.js';

export async function login(req, res) {
  try {
    const result = await AuthService.login(req.body);
    // Set cookie si login fue exitoso
    if (result.success && result.token) {
      res.cookie('access_token', result.token, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT,
        sameSite: 'lax',
        path: '/',
        maxAge: 600 * 1000
      });
    }
    return res.status(result.status || 200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
}

export async function post(req, res) {
  try {
    const result = await AuthService.register(req.body);
    return res.status(result.status || 200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al crear nuevo usuario.' });
  }
}

export async function activate(req, res) {
  try {
    const result = await AuthService.activate(req.query.token);
    return res.status(result.status || 200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al activar usuario.' });
  }
}

export async function recoveryPassword(req, res) {
  try {
    const result = await AuthService.recoveryPassword(req.body.email);
    return res.status(result.status || 200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al recuperar contraseña.' });
  }
}

// export async function changePassword(req, res){
//   const {idusuario,password} = req.body;

//   try {
//     const user = Auth.updatePassword(idusuario, password);

//   } catch (error) {
    
//   }

// }
