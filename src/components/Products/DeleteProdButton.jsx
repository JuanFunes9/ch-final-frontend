import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

// ===================== Material UI ===================== //
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// ===================== Services ===================== //
import deleteProduct from '../../services/products/deleteProduct';

// ==================================================== //

const DeleteProdButton = ({ product_id }) => {
    const { user, token } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = async() => {
        const data = await deleteProduct(product_id, token);
        navigate('/products');
        setOpen(false);
    }

    return (
        <div>
            <Button
                variant="contained"
                color="error"
                sx={{ml: 2}}
                onClick={handleClickOpen}
            >
                <DeleteForeverIcon /> Eliminar
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Esta seguro que desea eliminar el producto?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Para deshacer esta acción debera hablar con el administrador de la base de datos.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancelar</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteProdButton;