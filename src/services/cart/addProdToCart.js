import axios from "axios";

const addProdToCart = async (token, prodId) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/cart/add-product/${prodId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: ${import.meta.env.VITE_API_BASE_URL}/cart/add-product/${prodId}` + error);
    }
}

export default addProdToCart;