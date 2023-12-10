import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './form.css';
import { useNavigate } from "react-router-dom";
import Spinner from '../ui/Spinner';
import Swal from 'sweetalert2';
import axios from 'axios';
import { EnvironmentVariables } from '../../constants/EnvironmentVariables';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
          .required('Password is required'),
      }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${EnvironmentVariables.BASE_URL}/auth/login`, values);
        const token = response.data.token;
        localStorage.setItem('token', token);

        navigate('/home');
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='form'>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit">{isLoading ? <Spinner /> : 'Login'}</button>
    </form>
  );
};

export default Login;
