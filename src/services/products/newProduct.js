import axios from 'axios';

const postProduct = async( newProduct, token) => {
    try {
        const { data } = await axios.post(
            `http://localhost:3000/products`,
            newProduct,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: http://localhost:3000/products`);
    }
}

export default postProduct;