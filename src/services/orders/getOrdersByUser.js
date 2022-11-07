import axios from "axios";

const getOrdersByUser = async (token) => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/orders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: http://localhost:3000/orders` + error);
    }
}

export default getOrdersByUser;