import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TabPanel from './components/TabPanel';
import CustomerTable from './components/CustomerTable';
import CustomerForm from './components/CustomerForm';
import * as expressService from './services/expressService';
import * as nestService from './services/nestService';
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEditCustomer(null);
    setShowForm(false);
  };

  const fetchCustomers = async () => {
    try {
      const response =
        value === 0
          ? await expressService.getCustomers()
          : await nestService.getCustomers();
      setCustomers(response.data);
      console.log(response.data); // Correct results from API call
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
      if (value === 0) {
        await expressService.deleteCustomer(id);
      } else {
        await nestService.deleteCustomer(id);
      }
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editCustomer) {
        if (value === 0) {
          await expressService.updateCustomer(editCustomer.no, values);
        } else {
          await nestService.updateCustomer(editCustomer.no, values);
        }
      } else {
        if (value === 0) {
          await expressService.addCustomer(values);
        } else {
          await nestService.addCustomer(values);
        }
      }
      setShowForm(false);
      setEditCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  // New function to handle closing the form and resetting states
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