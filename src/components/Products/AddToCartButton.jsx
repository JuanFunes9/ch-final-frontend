import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

// ================ Material UI ================ //
import CloseIcon from '@mui/icons-material/Close';
import { Stack, CircularProgress, Button, IconButton, Snackbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ================ Services ================ //
import addProdToCart from '../../services/cart/addProdToCart';

const AddToCartButton = ({ product }) => {

    const { token } = useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleAddToCart = async (prodId) => {
        if (!token) navigate('/auth/login')
        await addProdToCart(token, prodId)
        handleClick()
    }

    return (
        <div>
            <Button
                variant="contained"
                sx={{ bgcolor: '#05d305' }}
                onClick={() => handleAddToCart(product._id)}
            >Agregar al carrito</Button>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Producto agregado!
                    <Button variant='outlined' size="small" onClick={handleClose} sx={{ml: 10}}>
                        <Link to={'/cart'}>Ver Carrito</Link>
                    </Button>
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AddToCartButton;