import axios from "axios";

const removeProdFromCart = async (token, prodId) => {
    try {
        const { data } = await axios.delete(`http://localhost:3000/cart/delete-product/${prodId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: http://localhost:3000/cart/delete-product/${prodId}`);
    }
}

export default removeProdFromCart;