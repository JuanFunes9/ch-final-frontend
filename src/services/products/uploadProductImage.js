import axios from 'axios';

const uploadProductImage = async( f, token) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/products/upload-img`,
            f,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: ${import.meta.env.VITE_API_BASE_URL}/products/upload-img`);
    }
}

export default uploadProductImage;