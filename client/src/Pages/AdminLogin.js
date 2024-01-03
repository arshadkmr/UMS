import React,{useEffect} from 'react'

import LoginNavbar from '../Components/LoginNavbar/LoginNavbar'
import Admin from '../Components/AdminLogin/AdminLogin'
import {useNavigate} from 'react-router-dom'
import jwt from 'jwt-decode'


function AdminLogin() {
    const navigate=useNavigate()
    useEffect(() => {
      const token=localStorage.getItem('adminToken')
      if(token){
        const user=jwt(token)
        if(user){
            navigate('/adminHome')
        }
      }else{
        navigate('/admin')
      }
    
      
    }, [navigate])
    
  return (
    <div>
         <LoginNavbar/>
       <Admin/>
    </div>
  )
}

export default AdminLogin