import axios from 'axios';

const register = async ({ firstName, lastName, email, password, address, phone }) => {
    try {
        const { data } = await axios.post(
            `http://localhost:3000/auth/register`,
            { firstName, lastName, email, password, address, phone }
        );

        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: localhost:3000/auth/register`, error);
        return false;
    }
}

export default register;