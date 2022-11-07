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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';

// ===================== Services ===================== //
import uploadProductImage from '../../services/products/uploadProductImage';
import putProduct from '../../services/products/putProduct';

// ==================================================== //

const EditProductButton = ({ product_id, product }) => {
    const { user, token } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({
        title: '',
        price: '',
        desc: '',
        categorie: '',
        image: ''
    })
    const [image, setImage] = useState('')
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setImage('');
        setEditProduct({
            title: '',
            price: '',
            desc: '',
            categorie: ''
        });
        setOpen(false);
    };

    const handleConfirmEdit = async () => {
        if (image) {
            // Enviamos el archivo en un formData:
            const f = new FormData();
            f.append('file', image);

            // enviamos la imagen al endpoint de uploadImage y guardamos el link que devuelve:
            const { imageUrl } = await uploadProductImage(f, token);
            editProduct.image = imageUrl;
        }
        const data = await putProduct(product_id, token, editProduct);
        handleClose();
        window.location.reload()
        // window.location.href(`/products/get-by-id/${product_id}`);
    }

    const categories = [
        {
            name: 'Almacenamiento',
            value: 'almacenamiento'
        },
        {
            name: 'Componentes de PC',
            value: 'componentes-de-pc'
        },
        {
            name: 'Perifericos',
            value: 'perifericos'
        },
        {
            name: 'Sonido y Multimedia',
            value: 'sonido-y-multimedia'
        },
        {
            name: 'Impresoras',
            value: 'impresoras'
        },
        {
            name: 'Monitores',
            value: 'monitores'
        },
        {
            name: 'Smart TV',
            value: 'smart-tv'
        },
        {
            name: 'Notebooks',
            value: 'notebooks'
        },
        {
            name: 'Accesorios',
            value: 'accesorios'
        }
    ];

    return (
        <div>
            <Button
                variant="contained"
                color="warning"
                onClick={handleClickOpen}
            >
                <EditIcon /> Editar
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Editar producto
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Complete solo los campos que desea modificar y pulse enviar.
                    </DialogContentText>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { mb: 1.3 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                placeholder={product.title}
                                label="Título"
                                helperText="Mínimo 3 caractéres"
                                sx={{ width: '100%' }}
                                onChange={e => setEditProduct({ ...editProduct, title: e.target.value })}
                            />
                            <TextField
                                id="outlined-number"
                                placeholder={product.price.toString()}
                                label="Precio $"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: '25%', mr: 1 }}
                                onChange={e => setEditProduct({ ...editProduct, price: e.target.value })}
                            />
                            <FormControl sx={{ width: '73%' }}>
                                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    placeholder={product.categorie}
                                    label="Categoria"
                                    value={editProduct.categorie}
                                    onChange={e => setEditProduct({ ...editProduct, categorie: e.target.value })}
                                >
                                    {
                                        categories.map(categorie => {
                                            return (
                                                <MenuItem value={categorie.value} key={categorie.value}>{categorie.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                id="outlined-multiline-flexible"
                                placeholder={product.desc}
                                label="Descripción"
                                multiline
                                minRows={7}
                                maxRows={7}
                                sx={{ width: '100%' }}
                                onChange={e => setNewProduct({ ...newProduct, desc: e.target.value })}
                            />
                            <input
                                type="file"
                                className='input-file-new-prod'
                                onChange={e => setImage(e.target.files[0])}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancelar</Button>
                    <Button onClick={handleConfirmEdit} autoFocus>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditProductButton;