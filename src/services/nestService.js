// import axios from 'axios';

// const API_URL = 'http://localhost:3001';

// export const getCustomers = () => axios.get(`${API_URL}/customers`);
// export const addCustomer = (customer) => axios.post(`${API_URL}/customers`, customer);
// export const updateCustomer = (id, customer) => axios.put(`${API_URL}/customers/${id}`, customer);
// export const deleteCustomer = (id) => axios.delete(`${API_URL}/customers/${id}`);

import axios from 'axios';

export const getCustomers = (baseUrl) => axios.get(`${baseUrl}/customers`);
export const deleteCustomer = (baseUrl, id) => axios.delete(`${baseUrl}/customers/${id}`);
export const updateCustomer = (baseUrl, id, data) => axios.put(`${baseUrl}/customers/${id}`, data);
export const addCustomer = (baseUrl, data) => axios.post(`${baseUrl}/customers`, data);
