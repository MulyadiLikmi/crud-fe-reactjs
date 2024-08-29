import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { red } from '@mui/material/colors';

const CustomerSchema = Yup.object().shape({
  nama: Yup.string().required('Name is required'),
  alamat: Yup.string().required('Address is required'),
  kota: Yup.string().required('City is required'),
});

function CustomerForm({ initialValues, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CustomerSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field as={TextField} name="nama" label="Name" />
            {errors.nama && touched.nama ? <div>{errors.nama}</div> : null}
          </div>
          <div>
            <Field as={TextField} name="alamat" label="Address" />
            {errors.alamat && touched.alamat ? <div>{errors.alamat}</div> : null}
          </div>
          <div>
            <Field as={TextField} name="kota" label="City" />
            {errors.kota && touched.kota ? <div>{errors.kota}</div> : null}
          </div>
          <Button type="submit" fullWidth style={{ backgroundColor: '#af0000', color: '#fff' }}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default CustomerForm;
