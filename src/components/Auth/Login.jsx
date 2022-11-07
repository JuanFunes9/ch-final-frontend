import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

// ======================= Material UI ======================= //
import { CssVarsProvider } from '@mui/joy/styles';
import {Sheet, Typography, TextField, Button, Link, Alert, IconButton} from '@mui/joy';
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// ================ Services ================ //
import login from '../../services/auth/login';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate();

    const { setToken, setUser } = useContext(UserContext);

    const hanldeSendForm = async () => {
        const credentials = { email, password }
        const user = await login(credentials)

        if (!user) {
            return setInvalid(true)
        }

        setToken(user.token);
        setUser(user.user)
        window.sessionStorage.setItem('jwt', user.token);
        window.sessionStorage.setItem('user', JSON.stringify(user.user));
        navigate('/products');
    }

    return (
        <CssVarsProvider>
            <main className='log-form'>
                <Sheet
                    sx={{
                        width: 500,
                        height: 450,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & botom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md'
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Ingresar</b>
                        </Typography>
                        <Typography level="body2">Ingresa para continuar.</Typography>
                    </div>
                    <TextField
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        name="password"
                        type="password"
                        placeholder="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {
                        (invalid) ?
                            <Alert
                                sx={{ alignItems: 'flex-start', width: '400px', mx: 'auto' }}
                                startDecorator={React.cloneElement(<ReportIcon />, {
                                    sx: { mt: '2px', mx: '4px' },
                                    fontSize: 'xl2',
                                })}
                                variant="soft"
                                color='danger'
                                endDecorator={
                                    <IconButton variant="soft" size="sm" color='danger'>
                                        <CloseRoundedIcon onClick={() => setInvalid(false)} />
                                    </IconButton>
                                }
                            >
                                <div>
                                    <Typography fontWeight="lg" mt={0.25}>
                                        Error
                                    </Typography>
                                    <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                                        No ha ingresado crenciales validas!
                                    </Typography>
                                </div>
                            </Alert>
                            : false
                    }
                    <Button
                        sx={{ mt: 1, mx: 'auto', width: 350 }}
                        onClick={hanldeSendForm}
                    >Ingresar</Button>
                    <Typography
                        endDecorator={<Link href="/auth/register">Registrarse</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        No tienes una cuenta?
                    </Typography>
                </Sheet>
            </main>
        </CssVarsProvider>
    );
}

export default Login;