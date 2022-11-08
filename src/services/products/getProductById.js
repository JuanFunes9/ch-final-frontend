import axios from 'axios';

const getProductById = async(id) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/get-by-id/${id}`);

        if(data.error){
            return {}
        }

        return data.product;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: ${import.meta.env.VITE_API_BASE_URL}/products/get-by-id/${id}`);
    }
}

export default getProductById;