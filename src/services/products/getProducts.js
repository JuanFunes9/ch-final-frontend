import axios from 'axios';

const getProducts = async(categorie = '', page= '', sort = '') => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/products/${categorie}?page=${page}&sort=${sort}`
            );
        return data;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: http://localhost:3000/products/${categorie}`);
    }
}

export default getProducts;