import axios from 'axios';

const getProductById = async(id) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/products/get-by-id/${id}`);

        if(data.error){
            return {}
        }

        return data.product;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: http://localhost:3000/products/get-by-id/${id}`);
    }
}

export default getProductById;