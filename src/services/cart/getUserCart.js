import axios from "axios";

const getUserCart = async (token) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: ${import.meta.env.VITE_API_BASE_URL}/cart/`);
    }
}

export default getUserCart;