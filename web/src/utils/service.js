import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

const TOKEN = localStorage.getItem("api-token");

const config = {
    baseURL: API_URL,
    headers: {
        'X-Auth': TOKEN
    }
}

const service = axios.create(config);

export const setToken = (token) => {
    localStorage.setItem('api-token', token);
    service.defaults.headers.common['X-Auth'] = token;
    // service.defaults.headers['x-auth'] = token;
    console.log(service.defaults.headers.common['']);
}
export const hasToken = () => {
    return localStorage.getItem('api-token');
}

export const removeToken = () => {
    localStorage.removeItem('api-token');
}

/** APIs request */
export const fetchCustomers = () => {
    return service.get('/customers')
        .then(resp => resp.data.customers)
}

export const fetchOrders = (customerId) => {
    return service.get(`/customers/${customerId}/orders`)
        .then(resp => resp.data)
}

export const fetchOrderDetails = (customerId, orderId) => {
    return service.get(`/customers/${customerId}/orders/${orderId}`)
        .then(resp => resp.data)
}

export default service;