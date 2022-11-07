import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './AddNewProduct.css'

// ==================== Material UI ==================== //
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ==================== Components ==================== //
import AddNewProductButton from './AddNewProductButton';

// ===================================================== //

export const AddNewProduct = () => {
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        desc: '',
        categorie: ''
    });

    const [image, setImage] = useState('')

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
        <div className="add-product-main-container">
            <div className="add-product-child-container">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mb: 1.3 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <div className="new-prod-title">
                            <h1>Nuevo producto</h1>
                        </div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Título"
                            helperText="Mínimo 3 caractéres"
                            sx={{ width: '100%' }}
                            onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                        />
                        <TextField
                            id="outlined-number"
                            label="Precio $"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ width: '30%', mr: 1 }}
                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <FormControl sx={{ width: '69%' }}>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Categoria"
                                value={newProduct.categorie}
                                onChange={e => setNewProduct({ ...newProduct, categorie: e.target.value })}
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
                        <AddNewProductButton
                            newProduct={newProduct}
                            image={image}
                        />
                    </div>
                </Box>
            </div>
        </div>
    )
}
