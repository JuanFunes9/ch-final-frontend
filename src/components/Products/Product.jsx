import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';


// ================ Material UI ================ //
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../../context/UserContext';
import { Stack, CircularProgress, Button, IconButton, Snackbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ================ Services ================ //
import getProductById from '../../services/products/getProductById';


// ================= Components ======================== //
import AddToCartButton from './AddToCartButton';
import DeleteProdButton from './DeleteProdButton';
import EditProductButton from './EditProductButton';


// ================================================== //

export const Product = () => {

	const { user, token } = useContext(UserContext);
	const [product, setProduct] = useState(null);
	const product_id = window.location.href.split("/")[5];
	const navigate = useNavigate();

	useEffect(() => {
		getProductById(product_id)
			.then(prod => prod ? setProduct(prod) : navigate('/page-not-found'));
	}, [product_id]);

	return (
		<>
			{
				(product) ?
					<div className='prod-main-container'>
						<div className="prod-child-container">
							<div className="back-btn" onClick={() => navigate(-1)}>
								<ArrowBackIcon fontSize='large' />
							</div>
							<div className="prod-img-container">
								<img src={product.image} alt="img" />
							</div>
							<div className="prod-dec-container">
								<div className="title-n-desc">
									<div className="prod-dec-container-title">
										<h1>{product.title}</h1>
									</div>
									<div className="prod-dec-container-desc">
										<p>{product.desc}</p>
									</div>
								</div>
								<div className="prod-dec-container-price-btn">
									<div className="price-container">
										<h4><span>$</span>{product.price}</h4>
									</div>
									{
										(!user || user.role !== 'ADMIN_ROLE')
											?
											<div className="btn-container">
												<AddToCartButton product={product} />
											</div>
											:
											<div className="btn-container">
												<EditProductButton product_id={product_id} product={product} />
												<DeleteProdButton product_id={product_id} />
											</div>
									}

								</div>
							</div>
						</div>
					</div> :
					<div className='loading-container'>
						<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
							<CircularProgress color="inherit" />
						</Stack>
					</div>
			}
		</>

	)
}
