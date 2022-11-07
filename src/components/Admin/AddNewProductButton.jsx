import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

// ======================= Material UI ======================= //
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

// ======================= Services ======================= //
import uploadProductImage from '../../services/products/uploadProductImage';
import postProduct from '../../services/products/newProduct';


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


const AddNewProductButton = ({ newProduct, image }) => {
    const [open, setOpen] = useState(false);
    const { user, token } = useContext(UserContext);
    const [prodAdded, setProdAdded] = useState({})
    const navigate = useNavigate();

    const handleAddProduct = async () => {
        // Enviamos el archivo en un formData:
        const f = new FormData();
        f.append('file', image);

        // Hacemos las peticiones a los endpoints de subir imagen y luego editar usuario:
        const { imageUrl } = await uploadProductImage(f, token);
        newProduct.image = imageUrl;
        const data = await postProduct(newProduct, token);
        
        if(data.ok) setProdAdded(data.newProd)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Button
                size="large"
                variant="contained"
                color="success"
                sx={{ width: '50%', mt: 2, ml: '25%' }}
                onClick={handleAddProduct}
            >
                <b>Cargar</b>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                sx={{ minWidth: '100%' }}
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Producto agregado con éxito!
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        • Titulo: {newProduct.title}
                    </Typography>
                    <Typography gutterBottom>
                        • Precio: {newProduct.price}
                    </Typography>
                    <Typography gutterBottom>
                        • Descripción: {newProduct.desc}
                    </Typography>
                    <Typography gutterBottom>
                        • Imagen URL: {newProduct.image}
                    </Typography>
                    <Typography gutterBottom>
                        • Categoria: {newProduct.categorie}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        <Link to={'/add-product'}>Agregar otro</Link>
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        <Link to={`/products/get-by-id/${prodAdded._id}`}>Ver producto</Link>
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Box>
    )
}

export default AddNewProductButton;