import React from 'react'
import { useState, useEffect } from 'react';
import './Tabs.css'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ================ Services ================ //
import getProducts from '../../services/products/getProducts';

// ================ Components ================ //
import { Products } from '../Products/Products';

const Tabs = () => {

  const [categorie, setCategorie] = useState('');
  const [sort, setSort] = useState('')
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(categorie)
      .then(prods => setProducts(prods));
  }, [categorie])

  console.log(sort)

  const categories = [
    {
      name: 'Almacenamiento',
      key: 'almacenamiento'
    },
    {
      name: 'Componentes de PC',
      key: 'componentes-de-pc'
    },
    {
      name: 'Perifericos',
      key: 'perifericos'
    },
    {
      name: 'Sonido y multimedia',
      key: 'sonido-y-multimedia'
    },
    {
      name: 'Impresoras',
      key: 'impresoras'
    },
    {
      name: 'Monitores',
      key: 'monitores'
    },
    {
      name: 'Smart-TV',
      key: 'smart-tv'
    },
    {
      name: 'Notebooks',
      key: 'notebooks'
    },
    {
      name: 'Accesorios',
      key: 'accesorios'
    }
  ];

  return (
    <>
      <div className='tabs-main-container'>
        <div className="tabs-child-container">
          <div
            className="tab-item"
            onClick={() => setCategorie('')}
          >
            Todos
          </div>
          {
            categories.map(cat => {
              return (
                <div
                  className="tab-item"
                  key={cat.key}
                  onClick={() => setCategorie(cat.key)}
                >
                  {cat.name}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="prods-filters">
        <div className="filters-main-container">
          <div className="filters-child-container">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ordenar por precio</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="sort"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <MenuItem value={'ASC'}>Ascendente</MenuItem>
                  <MenuItem value={'DESC'}>Descendente</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <Products products={products} />
      </div>
    </>
  )
}

export default Tabs