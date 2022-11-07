import axios from "axios";

const addProdToCart = async (token, prodId) => {
    try {
        const { data } = await axios.post(
            `http://localhost:3000/cart/add-product/${prodId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: http://localhost:3000/cart/add-product/${prodId}` + error);
    }
}

export default addProdToCart;