import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export const ProtectedAdminRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user.role !== 'ADMIN_ROLE') {
        return <Navigate to={'/products'} />
    }


    return <Outlet />;
}

