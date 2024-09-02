import axios from 'axios';

export const getCustomers = (baseUrl) => axios.get(`${baseUrl}/customers`);
export const deleteCustomer = (baseUrl, id) => axios.delete(`${baseUrl}/customers/${id}`);
export const getCustomerById = (baseUrl, id) => axios.get(`${baseUrl}/customers/${id}`);
export const updateCustomer = (baseUrl, id, data) => axios.put(`${baseUrl}/customers/${id}`, data);
export const addCustomer = (baseUrl, data) => axios.post(`${baseUrl}/customers`, data);