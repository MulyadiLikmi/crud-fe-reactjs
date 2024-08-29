import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function CustomerTable({ customers, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.no}>
            <td>{customer.no}</td>
            <td>{customer.nama}</td>
            <td>{customer.alamat}</td>
            <td>{customer.kota}</td>
            <td>
              <IconButton onClick={() => onEdit(customer)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(customer.no)}>
                <DeleteIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;

