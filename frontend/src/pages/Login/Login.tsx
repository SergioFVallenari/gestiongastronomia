import { useForm } from "react-hook-form";
import { Box, Form, Heading } from "../../components/elements";
import donfaustinopng from '../../images/logo-donFaustino/don-faustino2.png';
import { useNavigate } from "react-router-dom";
import api from "../../helpers";

interface LoginFormInputs {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = (data: LoginFormInputs) => {
        api.post('/autorizacion/login', data)
        .then(res => {
            const data:any = res.data
            if (data.info) {
                localStorage.setItem('token', data.content);
                navigate('/dashboard');
            } else {
                alert(data.msg || 'Error de login');
            }
        })
        .catch(error => {
            console.error(error);
            alert('Error al conectar con el servidor');
        })
    }

    return (
        <Box className="mc-auth">
            <Box className="mc-auth-group">
                <Box className="mc-auth-logo">
                    <img src={donfaustinopng} alt="Logo" />
                </Box>
                <Box className="mc-auth-form">
                    <Heading as='h4' className='mc-auth-title'>Inicio de sesión</Heading>
                    <br />
                    <Form onSubmit={handleSubmit(onSubmit)} className="row shadow-lg mc-auth-form">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Correo Electronico</label>
                                <input
                                    type="text"
                                    {...register('username', { required: 'Email is required' })}
                                    style={{ backgroundColor: 'white' }}
                                />
                                {errors.username && <span>{errors.username.message}</span>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    {...register('password', { required: 'Password is required' })}
                                    style={{ backgroundColor: 'white' }}
                                />
                                {errors.password && <span>{errors.password.message}</span>}
                            </div>
                        </div>
                        <div className="mc-auth-form-group">
                            <button type="submit" className="btn btn-danger">Ingresar</button>
                        </div>
                    </Form>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;
