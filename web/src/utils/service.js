import axios from 'axios';

const API_URL = '/api/';

const TOKEN = localStorage.getItem("api-token");

const config = {
    baseURL: API_URL,
    headers: {
        'x-auth': TOKEN
    }
}

const service = axios.create(config);

export const setToken = (token) => {
    localStorage.setItem('api-token', token);
    service.defaults.headers.common['x-auth'] = localStorage.getItem('api-token');
}
export const hasToken = () => {
    return localStorage.getItem('api-token');
}

export const removeToken = () => {
    localStorage.removeItem('api-token');
}

const getService = () => {
    config.headers['x-auth'] = localStorage.getItem('api-token')
    return axios.create(config);
}

/** APIs request */
export const fetchCustomers = () => {
    return getService().get('/customers')
        .then(resp => resp.data.customers)
}

export const fetchOrders = (customerId) => {
    return getService().get(`/customers/${customerId}/orders`)
        .then(resp => resp.data)
}

export const fetchOrderDetails = (customerId, orderId) => {
    return getService().get(`/customers/${customerId}/orders/${orderId}`)
        .then(resp => resp.data)
}

export default service;