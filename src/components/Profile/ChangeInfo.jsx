import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext';

// ================================ Material UI ================================ //
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ========================== Services =========================== //
import editUser from '../../services/profile/editUser';

// ================================================================ //


const ChangeInfo = ({ name, propName }) => {

    const { token, user, setUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [newInfo, setNewInfo] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeInfo = async () => {
        const body = {};
        body[propName] = newInfo;

        const data = await editUser(user.id, token, body);

        const newUserSession = user;
        newUserSession[propName] = newInfo;

        setUser(newUserSession);
        window.sessionStorage.removeItem('user');
        window.sessionStorage.setItem('user', JSON.stringify(newUserSession));

        setOpen(false);
    }

    return (
        <>
            <Button
                sx={{ fontSize: '1.1em' }}
                variant="outlined"
                color="success"
                onClick={handleClickOpen}
            >
                <EditIcon />
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cambiar {name}</DialogTitle>
                <DialogContent>
                    <input
                        type="text"
                        onChange={(e) => setNewInfo(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleChangeInfo}>Actualizar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ChangeInfo;
