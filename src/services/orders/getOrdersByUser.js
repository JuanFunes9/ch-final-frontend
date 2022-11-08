import axios from "axios";

const getOrdersByUser = async (token) => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/orders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: ${import.meta.env.VITE_API_BASE_URL}/orders` + error);
    }
}

export default getOrdersByUser;