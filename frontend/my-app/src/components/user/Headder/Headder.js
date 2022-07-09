import React from 'react'
import {Link} from 'react-router-dom'
import './Headder.css'
function Headder() {
  
  return (
          <nav className=" main navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link to='' className="navbar-brand" >User</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="logout-div">
                             
              </div>
            </div>
          </div>
        </nav>
  )
}

export default Headder
