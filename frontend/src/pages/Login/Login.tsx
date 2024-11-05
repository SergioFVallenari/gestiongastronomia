import { useForm } from "react-hook-form";
import { Box } from "../../components/elements";

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    return (
        <Box className="mc-auth">
            <Box className="mc-auth-group">
                <Box className="mc-auth-logo">
                    <img src="assets/images/logo.png" alt="Logo" />
                </Box>
                <Box className="mc-auth-form">
                    <form onSubmit={handleSubmit(data => console.log(data))} className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text"{...register('email', ({ required: 'Email is required' }))} />
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className="mc-auth-form-group">
                            <label>Password</label>
                            <input type="password" {...register('password', ({ required: 'Password is required' }))} />
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>
                        <div className="mc-auth-form-group">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;