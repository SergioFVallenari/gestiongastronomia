import { Router, Response, Request } from 'express';
import Autorizacion from '../class/class_autorizacion';
const { login } = new Autorizacion();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        // Llamar al método login para obtener los datos del usuario
        const user: any = await login({ username });

        // Si el usuario no existe, retornar un error
        if (!user[0].info) {
            res.status(200).json({
                info: false,
                msg: user[0].message,
                content: null
            });
            return
        }

        // Recuperar el hash de la contraseña almacenada
        const storedHash = user[0].hashed_password;
        console.log(storedHash,'storedHash');
        console.log(password,'password');
        // Verificar si la contraseña ingresada coincide con el hash almacenado
        const passwordMatch = await bcrypt.compare(password, storedHash);
        console.log(passwordMatch,'passwordMatch');
        if (!passwordMatch) {
            res.status(200).json({
                info: false,
                msg: 'Contraseña incorrecta',
                content: null
            });
            return;
        }

        // Si la contraseña es correcta, generar un token JWT
        const token = jwt.sign(
            {
                    id: user[0].idusuarios,
                    username: user[0].username,
                    nombre: user[0].nombre,
                    apellido: user[0].apellido
            },
            JWT_SECRET,
            { expiresIn: '365d' }
        );

        // Responder con el token
        res.status(200).json({
            info: true,
            msg: 'Usuario logueado correctamente',
            content: token
        });

    } catch (error) {
        console.error('Error al loguear usuario:', error);
        res.status(400).json({
            info: false,
            msg: 'Error al loguear usuario',
            content: null
        });
    }
});


export default router;