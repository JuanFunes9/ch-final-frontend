import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Cart.css'

// ======================= Material UI ======================= //
import { Box, Stack, styled, Paper, Button } from '@mui/material';

// ======================= Services ======================= //
import getUserCart from '../../services/cart/getUserCart';
import removeProdFromCart from '../../services/cart/removeProdFromCart';

// ======================= Components ======================= //
import SendOrderButton from './sendOrderButton';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	fontSize: 20,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const acortTitle = (title) => {
	const arr = title.split("")
	if (arr.length < 50) return arr.join("");

	let recortedTitle = arr.splice(0, 48).join("").trim() + "...";
	return recortedTitle;
}

const calculateTotal = (prods) => {
	let total = 0;

	prods.forEach(prod => {
		total += prod.price;
	});

	return total;
}

const Cart = () => {

	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState('')
	const { user, token } = useContext(UserContext);

	useEffect(() => {
		getUserCart(token).then(data => setCart(data.cart));
	}, [])

	useEffect(() => {
		setTotal(calculateTotal(cart))
	}, [cart])

	const handleRemoveFromCart = async (prodId) => {
		await removeProdFromCart(token, prodId)
		getUserCart(token).then(data => setCart(data.cart));
	}

	return (
		<div className='cart-main-container'>
			<div className="cart-child-container">
				<div className="cart-prods-container">
					<div className="cart-prods-container-title">
						<h4>&#128722; Carrito</h4>
					</div>
					<div className="cart-prods-items-container">
						<Box sx={{ width: '100%' }}>
							<Stack spacing={2}>
								{
									cart.length ? cart.map(prod => {
										return (
											<div className="prod-cart-item" key={prod._id}>
												<Item sx={{
													fontSize: 18,
													display: 'flex',
													justifyContent: 'space-between'
												}}>
													&#127760;
													<div className="title-price">
														<Link to={`/products/get-by-id/${prod._id}`}>
															{acortTitle(prod.title)}
														</Link>
														<br />
														$ {prod.price}
													</div>
													<Button
														size="small"
														color="error"
														variant="outlined"
														sx={{ padding: 1 }}
														onClick={() => handleRemoveFromCart(prod._id)}
													>
														Eliminar
													</Button>
												</Item>
											</div>
										)
									})
										: <Item>Aun no hay nada en el carrito!</Item>
								}
							</Stack>
						</Box>
					</div>
				</div>
				<div className="cart-order-container">
					<div className="cart-order-datos">
						<h4>Detalle de factura:</h4>
						<Box sx={{ width: '100%' }}>
							<Stack spacing={2}>
								<Item sx={{
									width: '100%',
									fontSize: 20,
									textAlign: 'start'
								}}>&#128589; <b>Cliente:</b> {user.firstName} {user.lastName}</Item>
								<Item sx={{
									fontSize: 20,
									textAlign: 'start'
								}}>&#128640; <b>Dirección:</b> {user.address}</Item>
								<Item sx={{
									fontSize: 20,
									textAlign: 'start'
								}}>&#128242; <b>Telefono:</b> {user.phone}</Item>
								<Item sx={{
									fontSize: 35,
									textAlign: 'start'
								}}>&#128176; <b>Total:</b> $ {total}</Item>
							</Stack>
						</Box>
					</div>
					<SendOrderButton cart={cart}/>
				</div>
			</div>
		</div>
	)
}

export default Cart;