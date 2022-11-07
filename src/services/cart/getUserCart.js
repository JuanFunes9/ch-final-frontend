import axios from "axios";

const getUserCart = async (token) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/cart/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: http://localhost:3000/cart/`);
    }
}

export default getUserCart;