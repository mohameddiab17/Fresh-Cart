import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { authContext } from '../../Contexts/AuthContext';


export default function Login() {

  const {userIsLoggedIn , setUserIsLoggedIn} = useContext(authContext);

  const [errorMsg , setErrorMsg] = useState('');
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email : Yup.string().required('Email Is Required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Enter Valid Email' ),
    password : Yup.string().required('Password Is Required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/ , 'Special Charcters and digits')
  })

  
  const {values , handleSubmit , handleChange , errors , touched , handleBlur , isValid} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit : async ()=>{
      setErrorMsg('')
      try {
        setIsLoading(true)
        let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin' , values)
        // console.log(data);
        if (data.message === 'success') {
          setUserIsLoggedIn(true)
          localStorage.setItem('token' , data.token)
          if (window.location.pathname == '/login') {
            navigate('/home')
          } else {
            navigate(window.location.pathname)
          }
        }
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setIsLoading(false)
    },
    validationSchema
  });

  return (

    <>
    <div className="w-75 m-auto my-5">
      <h1>Login Now :</h1>
      <form onSubmit={handleSubmit} >

        <label htmlFor="email">Email:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.email} className='form-control mb-3' type="email" id='email' name='email' />
        {errors.email && touched.email  && <p className='alert alert-warning'>{errors.email}</p>}


        <label htmlFor="password">Password:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.password} className='form-control mb-3' type="password" id='password' name='password' autoComplete='off' />
        {errors.password && touched.password  && <p className='alert alert-warning'>{errors.password}</p>}


        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        { isLoading ?
        <button disabled type='button' className='btn bg-main px-2 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-3'></i> </button>
        :
        <button disabled={!isValid} type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Login</button>
        }


      </form>
    </div>
    </>
  )
}
