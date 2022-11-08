import axios from 'axios';

const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
            { email, password }
        );

        if(!data.ok){
            return false
        }

        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: ${import.meta.env.VITE_API_BASE_URL}/auth/login`);
    }
}

export default login;