import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

// ==================== Material UI ==================== //
import { Stack, CircularProgress } from '@mui/material';



export const Products = ({ products }) => {

	const [ready, setReady] = useState(false)

	useEffect(() => {
		if (products.length > 0) {
			setReady(true)
		}
	}, [products])


	return (
		<div className='prods-main-container'>
			<div className="prods-child-container">
				{
					(ready) ?
						products.map(prod => {
							return (
								<Link to={`/products/get-by-id/${prod._id}`} key={prod._id}>
									<div
										className="prod-item-container"
										key={prod._id}
									>
										<div className="prod-item-img-container">
											<img src={prod.image} alt="img" />
										</div>
										<div className="prod-item-desc-container">
											<div className="prod-item-desc-container-title">
												<h3>{prod.title}</h3>
											</div>
											<div className="prod-item-desc-container-price">
												<h4>$ {prod.price}</h4>
											</div>
										</div>
									</div>
								</Link>
							)
						}) :
						<div className='loading-container'>
							<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
								<CircularProgress color="inherit" />
							</Stack>
						</div>
				}
			</div>
		</div>
	)
}
