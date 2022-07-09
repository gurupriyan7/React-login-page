import React, { useEffect, useState } from 'react'
import './View.css'
import Headder from '../Headder/Headder'
import { useNavigate } from 'react-router-dom'
function View() {
  const [userDetails,setUserDetails]= useState({})
  const navigate=useNavigate()
  useEffect(()=>{
    const userInfo=localStorage.getItem("userInfo");
    if(userInfo){
      navigate("/view")
      setUserDetails(JSON.parse(userInfo))
    }else{
      navigate("/")
    }
  },[navigate])
  return (
    <div>
<Headder/>
     
      <div className="containerppp">
        <div className="shape">
            <div className="image"></div>
        </div>
        <h3>{userDetails.name}</h3>
        <h3 className="title">{userDetails.email}</h3>
        <p>Web Designer,UI designer,photographer,web developer,etc</p>
        <div className="icons">
            <button className='logoutbtn' onClick={()=>{
              localStorage.clear();
              navigate('/')
            }}>Logout</button>
        </div>
    </div>
    </div>
  )
}

export default View
