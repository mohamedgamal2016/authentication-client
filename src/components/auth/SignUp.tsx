import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './form.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../ui/Spinner';
import Swal from 'sweetalert2';
import { EnvironmentVariables } from '../../constants/EnvironmentVariables';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = useCallback(async(values:any)=>{
    setIsLoading(true);
    try {
      await axios.post(`${EnvironmentVariables.BASE_URL}/auth/signup`, values);
      navigate('/login');
    } catch (error: any) {
        if(error.response){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
          });
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Internal Server Error',
        });
    } finally {
      setIsLoading(false);
    }
  },[navigate]);
  
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_~`[:;/^*()+={}])[A-Za-z\d@$!%*#?&-_~`[:;/^*()+={}]{8,}$/,
            'Password must contain at least 1 letter, 1 number, 1 special character, and be at least 8 characters long'
          ),
      }),
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleLoginRedirect = useCallback(()=>{
    navigate('/login');
  },[navigate]);

  return (
    <div className='container'>
    <div className="form-container">
      <form onSubmit={formik.handleSubmit} className='form'>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}
      </div>
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
      <button type="submit">{isLoading ? <Spinner /> : 'Sign Up'}</button>
    </form>
    </div>
    <div className="login-link">
    <p>Already have an account? <a href="/login" onClick={handleLoginRedirect}>Login</a></p>
    </div>
    </div>
  );
};

export default SignUp;
