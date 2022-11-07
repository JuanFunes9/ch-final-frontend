import axios from 'axios';

const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post(
            `http://localhost:3000/auth/login`,
            { email, password }
        );

        if(!data.ok){
            return false
        }

        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: localhost:3000/auth/login`);
    }
}

export default login;