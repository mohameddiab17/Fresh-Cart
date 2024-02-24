import React, { Children, useContext } from 'react'
import { authContext } from '../../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute2({children}) {
    const {userIsLoggedIn , setUserIsLoggedIn} = useContext(authContext)
  return (
    <>
    { userIsLoggedIn ? <Navigate to={'/home'}/> : children }
    </>
  )
}
