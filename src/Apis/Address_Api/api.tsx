import axios from 'axios';

const ApiAddress = axios.create({
    baseURL: "https://viacep.com.br/ws/",
});

export default ApiAddress;