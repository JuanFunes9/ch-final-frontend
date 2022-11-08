import axios from "axios";

const removeProdFromCart = async (token, prodId) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/cart/delete-product/${prodId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: ${import.meta.env.VITE_API_BASE_URL}/cart/delete-product/${prodId}`);
    }
}

export default removeProdFromCart;