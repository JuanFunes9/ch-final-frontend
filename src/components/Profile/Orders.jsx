import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Stack, styled } from '@mui/material';

// ==================== Services ==================== //
import getOrdersByUser from '../../services/orders/getOrdersByUser';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    fontSize: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const calcTotal = (prods) => {
    let total = 0;
    prods.forEach(prod => total += prod.price)
    return total;
}

const Orders = () => {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrdersByUser(token).then(data => setOrders(data.orders))
    }, []);


    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                {
                    (orders.length) ?
                        orders.map(order => {
                            return (
                                <Item key={order.order_id}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="spanning table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" colSpan={3}>
                                                        <b>Orden N°:</b> {order.order_id}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" colSpan={3}>
                                                        <b>Fecha y hora:</b>  {order.date}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" colSpan={3}>
                                                        <b>Email del cliente:</b>  {order.user.email}
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {order.products.map(prod => (
                                                    <TableRow key={prod._id}>
                                                        <TableCell>{prod.title}</TableCell>
                                                        <TableCell align="right">x1</TableCell>
                                                        <TableCell align="right">$ {prod.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell colSpan={2}>Total</TableCell>
                                                    <TableCell align="right">$ {calcTotal(order.products)}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Item>
                            )

                        })
                        : <Item>&#11088; Todavia no has realizado ninguna compra!</Item>
                }
            </Stack>
        </Box>
    );
}

export default Orders;
