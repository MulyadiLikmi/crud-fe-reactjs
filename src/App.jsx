import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TabPanel from './components/TabPanel';
import CustomerTable from './components/CustomerTable';
import CustomerForm from './components/CustomerForm';
import * as apiService from './services/apiService';
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const expressBaseUrl = import.meta.env.VITE_URL_EXPRESS;
  const nestBaseUrl = import.meta.env.VITE_URL_NEST;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEditCustomer(null);
    setShowForm(false);
  };

  const fetchCustomers = async () => {
    try {
      const baseUrl = value === 0 ? expressBaseUrl : nestBaseUrl;
      const response = await apiService.getCustomers(baseUrl)
      setCustomers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [value]);

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const baseUrl = value === 0 ? expressBaseUrl : nestBaseUrl;
      await apiService.deleteCustomer(baseUrl, id);
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const baseUrl = value === 0 ? expressBaseUrl : nestBaseUrl;
      if (editCustomer) {
        await apiService.updateCustomer(baseUrl, editCustomer.no, values);
      } else {
        await apiService.addCustomer(baseUrl, values);
      }
      setShowForm(false);
      setEditCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditCustomer(null); // Reset editCustomer state
  };

  return (
    <div className="App">
      <h1>Customer Data - {value === 0 ? 'ExpressJS' : 'NestJS'}</h1>
      <AppBar>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Express.js" />
          <Tab label="NestJS" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
      </TabPanel>
      {/* Dialog for the form */}
      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>{editCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <CustomerForm initialValues={editCustomer || { nama: '', alamat: '', kota: '' }} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box m={2}>
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
          Add Customer
        </Button>
      </Box>
    </div>
  );
}

export default App;
