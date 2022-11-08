import axios from 'axios';

const putProduct = async(product_id, token, body) => {
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/products/${product_id}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: PUT: ${import.meta.env.VITE_API_BASE_URL}/products/${product_id}`);
    }
}

export default putProduct;