import axios from 'axios';

const editUser = async( uid, token, body) => {
    try {
        const { data } = await axios.put(
            `http://localhost:3000/users/${uid}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: PUT: http://localhost:3000/users/635fb077c2135a1c4d2445de`);
    }
}

export default editUser;