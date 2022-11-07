import axios from 'axios';

const deleteProduct = async(product_id, token) => {
    try {
        const { data } = await axios.delete(
            `http://localhost:3000/products/${product_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: DELETE: http://localhost:3000/products/${product_id}`);
    }
}

export default deleteProduct;