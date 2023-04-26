import axios from '../config/axios.conf';

export const getTakerOrders = (takerAddress) => {
    return axios.get('/orders/taker/' + takerAddress);
}

export const createOrder = (data) => {
    return axios.post('/orders', data);
}