import React from 'react'
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import '../../index.css'

// ================ Components ================ //
import NavBar from '../NavBar/NavBar'
import TabsNav from '../Tabs/Tabs'
import { Product } from '../Products/Product';
import Login from '../Auth/Login';
import Register from '../Auth/Register'
import { ProtectedRoute } from '../Auth/ProtectedRoute';
import { ProtectedAdminRoute } from '../Auth/ProtectedAdminRoute';
import { OnlyIfNotUser } from '../Auth/OnlyIfNotUser';
import { Profile } from '../Profile/Profile';
import Cart from '../Cart/Cart';
import { Chat } from '../chat/Chat';
import { AddNewProduct } from '../Admin/AddNewProduct';
import NotFound from '../errors/404view';


import { UserContext } from '../../context/UserContext';




const App = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <NavBar />
            <Routes>
            <Route path='/' element={<Navigate to='/products' />} />
                <Route element={<OnlyIfNotUser />}>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />
                </Route>
                <Route path='/products' element={<TabsNav />} />
                <Route path='/products/get-by-id/*' element={<Product />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/chat' element={<Chat />} />
                </Route>
                <Route element={<ProtectedAdminRoute />}>
                    <Route path='/add-product' element={<AddNewProduct />} />
                </Route>
                <Route path='/page-not-found' element={<NotFound />} />
                <Route path='/*' element={<Navigate to='/page-not-found' />} />
            </Routes>
        </>
    )
}


export default App;