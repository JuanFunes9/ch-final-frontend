import axios from 'axios';

const uploadUserImage = async( f ,token) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/users/update-img`,
            f,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: ${import.meta.env.VITE_API_BASE_URL}/users/update-img`);
    }
}

export default uploadUserImage;