import axios from '../config/axios.conf';

export const getTakerOrders = (takerAddress) => {
    return axios.get('/orders/taker/' + takerAddress);
}

export const getMakerOrders = (makerAddress) => {
    return axios.get('/orders/maker/' + makerAddress);
}

export const createOrder = (data) => {
    return axios.post('/orders', data);
}