import axios from 'axios';

const whoami = async (jwt) => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/auth/whoami`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        );

        if(!data.ok){
            return false
        }

        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: localhost:3000/auth/whoami`);
    }
}

export default whoami;