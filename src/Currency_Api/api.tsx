import axios from 'axios';

const ApiCurrency = axios.create({
    baseURL: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/",
});

export default ApiCurrency;