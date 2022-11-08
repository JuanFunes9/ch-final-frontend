import axios from 'axios';

const register = async ({ firstName, lastName, email, password, address, phone }) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
            { firstName, lastName, email, password, address, phone }
        );

        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: ${import.meta.env.VITE_API_BASE_URL}/auth/register`, error);
        return false;
    }
}

export default register;