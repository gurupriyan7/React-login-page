
import React, { useState } from 'react'
import classname from "classnames"
import { useNavigate } from 'react-router-dom'
import "./AdminLogin.css"
// import axios from 'axios'
const axios =require('axios')

function AdminLogin() {
          const [email,setEmail]=useState('')
          const [password,setPassword]=useState('')
          const [error,setError]= useState({})
          const navigate=useNavigate()
          

          const submitHandler=async(e)=>{
                    e.preventDefault();
                    try{
                              const config={
                                        headers:{
                                          "content-type":"application/json"
                                        }
                                      }
                                      console.log('arrived');
                              const {data} = await axios.post('/api/admin/login',{email,password},config)
                              console.log("data:",data);
                              localStorage.setItem("adminInfo",JSON.stringify(data))
                              console.log("successs");
                              if(localStorage.adminInfo){

                                        navigate('/admin')
                              }
                    }catch(err){
                              setError(err.response.data)
                              console.log('this hieos',err);
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
     
                 <h3 className="mb-5">Welcome Back Admin</h3>
                 
                 <div className="form-outline mb-4">
                   {/* <label  className="labell" for="typeEmailX-2">Email</label> */}
                   
                   {error.email && (<div style={{color:"red"}}>{error.email}</div>)}
                   <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="typeEmailX-2" className={classname('form-control form-control form-control-lg text-start',{
                    'is-invalid': error.email
                    })} placeholder='Email' />
                 </div>
     
                 <div className="form-outline mb-4">
                   {/* <label className="labell" for="typePasswordX-2">Password</label> */}
                   {error.password && (<div style={{color:"red"}}>{error.password}</div>)}
                  
                   <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="typePasswordX-2"  className={classname('form-control form-control form-control-lg',{
                    'is-invalid': error.password
                    })}  placeholder='Password' />
                 </div>
                 <button onClick={submitHandler} style={{width:"100%"}} className="btn btn-primary  btn-block" type="submit">Login</button>
                
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
         </div>
  )
}

export default AdminLogin
