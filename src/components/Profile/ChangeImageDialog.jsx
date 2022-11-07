import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext';

// ==================== Material UI ==================== //
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ========================== Services =========================== //
import uploadUserImage from '../../services/profile/uploadUserImage';
import editUser from '../../services/profile/editUser';

// ============================================================== //

export const ChangeImageDialog = () => {

    const { token, user, setUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeImage = async () => {
        // Enviamos el archivo en un formData:
        const f = new FormData();
        f.append('file', file);

        // Hacemos las peticiones a los endpoints de subir imagen y luego editar usuario:
        const { imageUrl } = await uploadUserImage(f, token);
        await editUser(user.id, token, {
            image: imageUrl
        });

        // Modificamos el sessionStorage con los datos de usuario actualizado:
        const newUserSession = { ...user, image: imageUrl }

        setUser(newUserSession);
        window.sessionStorage.removeItem('user');
        window.sessionStorage.setItem('user', JSON.stringify(newUserSession));

        setOpen(false);
    }


    return (
        <>
            <Button>
                <CameraAltIcon
                    sx={{ fontSize: '5em' }}
                    onClick={handleClickOpen}
                />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cambiar Imagen de Usuario</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: '50px' }}>
                        Elige desde tu PC una imagen para usar como perfil. Recueda que los formatos permitidos son: PNG, JPG, JPEG, SGV y WEBP.
                    </DialogContentText>
                    <input
                        type="file"
                        onChange={e => setFile(e.target.files[0])}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleChangeImage}>Cargar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
