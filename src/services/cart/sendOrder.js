import axios from "axios";

const sendOrder = async (token) => {
    try {
        const { data } = await axios.post(
            `http://localhost:3000/cart/send-order`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: POST: http://localhost:3000/cart/send-order` + error);
    }
}

export default sendOrder;