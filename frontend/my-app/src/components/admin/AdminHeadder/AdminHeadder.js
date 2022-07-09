import React from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminHeadder.css'


function AdminHeadder() {
          const navigate=useNavigate()
  return (
          <nav className=" main navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <h3 className="navbar-brand" >Admin Pannel</h3>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="logout-div">
                              <h6 className='logout-admin' onClick={()=>{
                                localStorage.clear();
                                navigate('/admin/login')
                              }}>Logout</h6>
              </div>
            </div>
          </div>
        </nav>
  )
}

export default AdminHeadder
