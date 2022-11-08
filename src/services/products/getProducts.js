import axios from 'axios';

const getProducts = async(categorie = '', page= '', sort = '') => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/products/${categorie}?page=${page}&sort=${sort}`
            );
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: ${import.meta.env.VITE_API_BASE_URL}/products/${categorie}`);
    }
}

export default getProducts;