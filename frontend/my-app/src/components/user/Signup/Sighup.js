import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import classname from "classnames"

function Sighup() {
  const [name,setName]=useState('')
  const [email,setEmail] = useState('')
  const  [password,setPassword] =useState('')
  const [error,setError] = useState({})
  const navigate=useNavigate()


  const submitHandler=async(e) =>{
    e.preventDefault()
    try{

      const config={
        headers:{
          "Content-type":"application/json"
        }
      }
      console.log(name,email,password);
      const {data} = await axios.post('/api/users/',{name,email,password},config)
             if(data){
               navigate('/')
             }
    }catch(err){
      setError(err.response.data)
      console.log(error);

    }

    

    
  }
  return (

    <div>
     <section class="vh-100" style={{backgroundColor:" #508bfc;"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Sign up</h3>
            

            <div className="form-outline mb-4">
              {/* <label  className="labell" for="typeEmailX-2">Name</label> */}
              {error.name &&<div style={{color:"red"}}>{error.name}</div>}
              <input type="text" id="typeEmailX-2"value={name} onChange={(e)=>setName(e.target.value)} className={classname("form-control form-control-lg text-start",{
                "is-invalid":error.name
              })}  placeholder='Name'/>
            </div>
            <div className="form-outline mb-4">
            {error.email &&<div style={{color:"red"}}>{error.email}</div>}
              {/* <label  className="labell" for="typeEmailX-2">Email</label> */}
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="typeEmailX-2" className={classname("form-control form-control-lg text-start",{
                "is-invalid":error.email
              })} placeholder='Email' />
            </div>

            <div className="form-outline mb-4">
              {/* <label className="labell" for="typePasswordX-2">Password</label> */}
              {error.password &&<div style={{color:"red"}}>{error.password}</div>}
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="typePasswordX-2" className={classname("form-control form-control-lg",{
                "is-invalid":error.password
              })} placeholder='Password' />
            </div>
            <button onClick={submitHandler} style={{width:"100%"}} className="btn btn-primary  btn-block" type="submit">Signup</button>
            <Link className=" signup d-block text-center mt-2 small" to="/">Alredy have an account yet? Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Sighup
