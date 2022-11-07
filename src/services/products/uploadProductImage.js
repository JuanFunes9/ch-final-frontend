import axios from 'axios';

const uploadProductImage = async( f, token) => {
    try {
        const { data } = await axios.post(
            `http://localhost:3000/products/upload-img`,
            f,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: http://localhost:3000/products/upload-img`);
    }
}

export default uploadProductImage;