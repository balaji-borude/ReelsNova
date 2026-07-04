import React from 'react'
import {Navigate} from 'react-router-dom'

const PublicRoute = ({children}:{children:React.ReactNode}) => {
    const isLoggedIn = localStorage.getItem('token') !== null; 

    if(isLoggedIn){
        return <Navigate to='/feed' replace />
    }

    return children;
}

export default PublicRoute