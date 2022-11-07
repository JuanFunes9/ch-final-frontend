import axios from 'axios';

const uploadUserImage = async( f ,token) => {
    try {
        const { data } = await axios.post(
            `http://localhost:3000/users/update-img`,
            f,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: http://localhost:3000/users/update-img`);
    }
}

export default uploadUserImage;