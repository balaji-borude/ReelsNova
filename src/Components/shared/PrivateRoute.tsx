import React from 'react'
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({children}: {children: React.ReactNode}) => {
 const isLoggedIn = localStorage.getItem('token') !== null; // Check if the user is logged in based on token presence
 if(!isLoggedIn){
     return <Navigate to='/login' replace />
 }
 return children
}

export default PrivateRoute