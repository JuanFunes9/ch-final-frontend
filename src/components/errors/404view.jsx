import React from 'react'
import { useNavigate } from 'react-router-dom';
import './errors.css'
import Button from '@mui/material/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-main-container">
      <div className="not-found-child-container">
        <img src="https://res.cloudinary.com/dxg8ulxz5/image/upload/v1667528122/404_01-min_bmothd.webp" alt="404" />
      </div>
      <Button
        variant="outlined"
        color="success"
        sx={{ mt: '10px' }}
        onClick={() => navigate('/products')}
      >
        Volver
      </Button>
    </div>
  )
}

export default NotFound;


