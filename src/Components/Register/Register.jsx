import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'


export default function Register() {

  // function validate(values){
  //   var errors ={};

  //   if (values.name === "") {
  //     errors.name = 'Name Is Required'
  //   }else if(values.name.length < 3){
  //     errors.name = 'Name Must Be More Than 3 Charcters'
  //   }else if(values.name.length >18){
  //     errors.name = 'Name Must Be less Than 20 Charcters'
  //   }

  //   if (values.email === '') {
  //     errors.email = 'Email Is Required'
  //   }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
  //     errors.email = 'Enter Valid Email'
  //   }

  //   if (values.password === '') {
  //     errors.password = 'Password Is Required'
  //   } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
  //     errors.password = 'Special Charcters and digits'
  //   }

  //   if (values.rePassword === '') {
  //     errors.rePassword = 'rePassword Is Required'
  //   }else if (values.password !== values.rePassword) {
  //     errors.rePassword = "rePassword Doesn't Match Password "
  //   }

  //   if (values.phone === '') {
  //     errors.phone = 'Phone Number Is Required'
  //   }else if (!/^01[0125][0-9]{0,8}$/.test(values.phone)) {
  //     errors.phone = "Please Enter Egyption Phone Number"
  //   }

  //   // console.log(errors);
  //   return errors;
  // }


  const [errorMsg , setErrorMsg] = useState('');
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name : Yup.string().required('Name Is Required').min(3 , 'Name Must Be More Than 3 Charcters').max(18 , 'Name Must Be less Than 18 Charcters'),
    email : Yup.string().required('Email Is Required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Enter Valid Email' ),
    password : Yup.string().required('Password Is Required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/ ,  'Special Charcters and digits'),
    rePassword : Yup.string().required('rePassword Is Required').oneOf([Yup.ref('password')] , 'rePassword Must Match Password'),
    phone : Yup.string().required('Phone Is Required').matches( /^01[0125][0-9]{8}$/ , "Please Enter Egyption Phone Number")
  })


  const { values , handleChange , handleSubmit , errors , touched , handleBlur , isValid } = useFormik({
    initialValues:{
      name: '' ,
      email: '' ,
      password: '' ,
      rePassword: '' ,
      phone: '' 
    },
    onSubmit: async ()=>{
      try {
        setErrorMsg('')
        setIsLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
        // console.log(data);
        if(data.message === 'success'){
          navigate('/login')
        }
        
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setIsLoading(false)
    },
    // validate  // validate:validate ==> so we can write only one
    validationSchema
  })

  return (
    <>
    <div className="w-75 m-auto my-5">
      <h1>Register Now :</h1>
      <form onSubmit={handleSubmit} >

        <label htmlFor="name" className='my-1'>Name:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" className='form-control mb-3' id='name' name='name' />
        {errors.name && touched.name && <p className='alert alert-warning '>{errors.name}</p>}
        
        <label htmlFor="email" className='my-1'>Email:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        { errors.email && touched.email && <p className='alert alert-warning'>{errors.email}</p>}

        <label htmlFor="password" className='my-1'>Password:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" className='form-control mb-3' id='password' name='password' autoComplete='on' />
        {errors.password && touched.password && <p className='alert alert-warning'>{errors.password}</p>}

        <label htmlFor="rePassword" className='my-1'>rePassword:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" className='form-control mb-3' id='rePassword' name='rePassword' autoComplete='on' />
        {errors.rePassword && touched.rePassword && <p className='alert alert-warning'>{errors.rePassword}</p>}

        <label htmlFor="phone" className='my-1'>phone:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <p className='alert alert-warning'>{errors.phone}</p>}

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {isLoading ?  
        <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-3'></i> </button>
        :
        <button disabled={!isValid } type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>
        }
        
      </form>
    </div>
    </>
  )
}
