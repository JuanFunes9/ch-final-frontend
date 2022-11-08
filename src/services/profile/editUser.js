import axios from 'axios';

const editUser = async( uid, token, body) => {
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/users/${uid}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: PUT: ${import.meta.env.VITE_API_BASE_URL}/users/635fb077c2135a1c4d2445de`);
    }
}

export default editUser;