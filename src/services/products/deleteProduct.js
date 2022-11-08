import axios from 'axios';

const deleteProduct = async(product_id, token) => {
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/products/${product_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: DELETE: ${import.meta.env.VITE_API_BASE_URL}/products/${product_id}`);
    }
}

export default deleteProduct;