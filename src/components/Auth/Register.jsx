import * as React from 'react';
import { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// ================ Services ================ //
import register from '../../services/auth/register';

const Register = () => {
    //Estados:
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    });
    const [repPassword, setRepPassword] = useState('');
    const [invalid, setInvalid] = useState({ show: false, msg: '' });
    const navigate = useNavigate();

    //Funcion para setear el usuario en el useContext
    const { setToken, setUser } = useContext(UserContext);

    //Funcion para manejar el envio del formulario de registro:
    const hanldeSendForm = async () => {
        //Validar que las passwords coincidan. Desplegar alert si no lo hacen:
        if (credentials.password !== repPassword) {
            setInvalid({ show: true, msg: 'Las passwords no coinciden!' })
        }

        //Enviar la peticion el endpoint de Register y validar que no haya errores:
        const user = await register(credentials)
        if (!user) {
            setInvalid({ show: true, msg: 'No ha ingresado credenciales validas!' })
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
                        width: 750,
                        height: 550,
                        mx: 'auto', // margin left & right
                        my: 2, // margin top & botom
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
                            <b>Registro</b>
                        </Typography>
                        <Typography level="body2">Ingresa para continuar.</Typography>
                    </div>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                        <TextField
                            required
                            sx={{ width: 750 }}
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            label="Email"
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        />
                        <TextField
                            required
                            sx={{ width: 350 }}
                            name="firstName"
                            type="text"
                            placeholder="John"
                            label="Nombre"
                            onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })}
                        />
                        <TextField
                            required
                            sx={{ width: 350 }}
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            label="Apellido"
                            onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })}
                        />
                        <TextField
                            required
                            sx={{ width: 350 }}
                            name="password"
                            type="password"
                            placeholder="password"
                            label="Password"
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                        <TextField
                            required
                            sx={{ width: 350 }}
                            name="passwordRep"
                            type="password"
                            placeholder="password"
                            label="Repite la Password"
                            onChange={(e) => setRepPassword(e.target.value)}
                        />
                        <TextField
                            required
                            sx={{ width: 350 }}
                            name="phone"
                            type="text"
                            placeholder="+52-11-52759483"
                            label="Telefono"
                            onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                        />
                        <TextField
                            required
                            sx={{ width: 350 }}
                            name="address"
                            type="text"
                            placeholder="E. Martin St. 469"
                            label="Direccion"
                            onChange={(e) => setCredentials({ ...credentials, address: e.target.value })}
                        />
                    </Box>
                    {
                        (invalid.show) ?
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
                                        {invalid.msg}
                                    </Typography>
                                </div>
                            </Alert>
                            : false
                    }
                    <Button
                        sx={{ mt: 1, mx: 'auto', width: 350 }}
                        onClick={hanldeSendForm}
                    >Registrarse</Button>
                </Sheet>
            </main>
        </CssVarsProvider>
    );
}

export default Register;