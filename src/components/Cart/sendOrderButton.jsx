import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

// ======================= Material UI ======================= //
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

// ======================= Services ======================= //
import sendOrder from '../../services/cart/sendOrder';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const SendOrderButton = ({ cart }) => {
    const [open, setOpen] = useState(false);
    const { user, token } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSendOrder = async() => {
        if(!user || !token) {
            return navigate('/auth/login');
        }
        if(!cart.length) {
            return alert('Agrega al menos un producto antes de generar una orden.')
        }
        await sendOrder(token);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Button
                size="large"
                variant="contained"
                color="success"
                sx={{ width: '100%' }}
                onClick={handleSendOrder}
            >
                <b>Enviar Pedido</b>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Gracias por realizar su compra!
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        En breve uno de nuestros vendedores se pondra en contacto con usted a traves de los medios proporcionados.
                    </Typography>
                    <Typography gutterBottom>
                        Permaneza atento a su Whatsapp o su casilla de email!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        <Link to={'/products'}>Volver a productos</Link>
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Box>
    )
}

export default SendOrderButton;