import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getCustomers = () => axios.get(`${API_URL}/customers`);
export const addCustomer = (customer) => axios.post(`${API_URL}/customers`, customer);
export const updateCustomer = (id, customer) => axios.put(`${API_URL}/customers/${id}`, customer);
export const deleteCustomer = (id) => axios.delete(`${API_URL}/customers/${id}`);
