import React, {  useState } from 'react'
import './Login.css'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import classname from 'classnames'


function Login() {
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [error,setError] = useState({})
  
  const navigate=useNavigate()
  
  const submitHandler =async(e) =>{
    console.log("submitted successfully");
    e.preventDefault()
    try{
    
      

      
        const config={
          headers:{
            "content-type":"application/json"
          }
        }
        
        const { data } = await axios.post("/api/users/login",{email,password},config)
        console.log('data is:',data);
        localStorage.setItem("userInfo",JSON.stringify(data));
        if(localStorage.userInfo){
          navigate('/view')
        }
      
        
    }catch(err){
        setError(err.response.data)
        console.log('error is :',err);
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

            <h3 className="mb-5">Login</h3>
            
            <div className="form-outline mb-4">
              
              {error.email && (<div style={{color:"red"}}>{error.email }</div>) }
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="typeEmailX-2" className={classname('form-control form-control-lg text-start',{
                'is-invalid':error.email
              })} placeholder='Email' />
            </div>

            <div className="form-outline mb-4">
              {error.password && (<div style={{color:"red"}}>{error.password}</div>) }

              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="typePasswordX-2" className={classname("form-control form-control-lg",{
                "is-invalid":error.password
              })}  placeholder='Password' />
            </div>
            <button onClick={submitHandler} style={{width:"100%"}} className="btn btn-primary  btn-block" type="submit">Login</button>
            <Link className=" signup d-block text-center mt-2 small" to="/signup">Don't have an account yet? Register</Link>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Login

