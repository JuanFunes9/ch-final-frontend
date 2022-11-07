import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

const logout = () => {
    const navigate = useNavigate();
    const { setUser, setToken } = useContext( UserContext );
    setUser(null)
    setToken(null)

    return navigate('/products')
}

export default logout