import axios from 'axios';

const getProducts = async(categorie = '') => {
    try {
        const { data } = await axios.get(`http://localhost:3000/products/${categorie}`);
        return data.products;
    } catch (error) {
        console.log(`Error al realizar la peticion: GET: http://localhost:3000/products/${categorie}`);
    }
}

export default getProducts;