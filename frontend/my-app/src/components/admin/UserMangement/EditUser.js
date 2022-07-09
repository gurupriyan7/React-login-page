import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditUser() {

          const [name,setName] = useState('')
          const [email,setEmail] = useState('')
          const [error,setError] = useState({})
          const userId= useParams()
          const navigate= useNavigate()

          useEffect(() => {
                    console.log( 'ddddd');

                    try {
                      (async function () {
                        const { data } = await axios.get(
                          `/api/admin/edituser/${userId.userId}`
                        );
                        setName(data.name);
                        setEmail(data.email);
                      })();
                    } catch (error) {
                      throw new error(error.response.data.message);
                    }
                  }, []);

                  let handleLogin = async (e) => {
                    e.preventDefault();
                    try {
                      const config = {
                        headers: {
                          "Content-type": "application/json",
                        },
                      };
                      console.log(name, email);
                      await axios.patch(
                        `/api/admin/edituser/${userId.userId}`,
                        {
                          name,
                          email,
                        },
                        config
                      );
                      
                      navigate("/admin");
                    } catch (error) {
                      setError(error.response.data);
                    }
                  };
  return (
         
          <section className="vh-100" style={{backgroundColor:" #508bfc;"}}>
       <div className="container py-5 h-100">
         <div className="row d-flex justify-content-center align-items-center h-100">
           <div className="col-12 col-md-8 col-lg-6 col-xl-5">
             <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
               <div className="card-body p-5 text-center">
     
                 <h3 className="mb-5">Edit User</h3>
                 {/* {error &&<h5 style={{color:"red"}}>{error}</h5>} */}
     
                 <div className="form-outline mb-4">
                   {/* <label  className="labell" for="typeEmailX-2">Name</label> */}
                   <input type="text" id="typeEmailX-2"value={name} onChange={(e)=>setName(e.target.value)} className="form-control form-control-lg text-start" placeholder='Name'/>
                 </div>
                 <div className="form-outline mb-4">
                   {/* <label  className="labell" for="typeEmailX-2">Email</label> */}
                   <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="typeEmailX-2" className="form-control form-control-lg text-start" placeholder='Email' />
                 </div>
                 <button onClick={handleLogin} style={{width:"100%"}} className="btn btn-primary  btn-block" type="submit">Update</button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
         
  )
}

export default EditUser
