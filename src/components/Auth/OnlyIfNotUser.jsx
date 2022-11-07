import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export const OnlyIfNotUser = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user) {
        return <Navigate to={'/products'} />
    }


    return <Outlet />;
}