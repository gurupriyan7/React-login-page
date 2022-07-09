import React from 'react'
import DataTable from "react-data-table-component"
import { useEffect, useState } from "react";
import axios from "axios";
import './AllUsers.css'
import AdminHeadder from '../AdminHeadder/AdminHeadder';

import { useNavigate } from 'react-router-dom';

function AllUsers() {


const [users,setUsers]=useState([])
const [search, setsearch] = useState("");
const [refresh, setRefresh] = useState(false);
const [filterValue, setfilterValue] = useState([]);

  
const navigate = useNavigate();
useEffect(()=>{
          const adminInfo =localStorage.getItem("adminInfo");
          if(adminInfo){
                    // navigate('/admin/dashboard') 
                   (async function(){

                    try{
                              
                              const config ={
                                        headers:{
                                                  "content-type":"application/json"
                                        }
                              };
                              const {data} = await axios.get("/api/admin",config)
                              setUsers(data)
                              setfilterValue(data)
                    }catch(error){
                          throw new Error(error.response.data.message); 
                         
                    }
                   })();
          }else{
                    navigate('/admin/login')
          }
},[navigate,refresh])

const deleteUser=async(userId,name)=>{

          if(window.confirm(`Are You sure You want to delete : ${name}`)){
                    console.log(userId);
                    try {
                              const config = {
                                headers: {
                                  "Content-type": "application/json",
                                },
                              };
                              await axios.delete("/api/admin/deleteuser", {
                                params: {
                                  id: userId,
                                },
                                config,
                              });
                              setRefresh(!refresh);
                            } catch (error) {
                              throw new Error(error.response.data.message);
                            }
          }
       
}

const editUser=async(userId)=>{
          try {
                    navigate(`/admin/edituser/${userId}`);
                  } catch (error) {
                    throw new error(error.response.data.message);
                  }
        }

useEffect(() => {
          const result = users.filter((users) => {
            return users.name.toLowerCase().match(search.toLowerCase());
          });
          setfilterValue(result);
        }, [search]);

  const columns =[
           
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name:"Email",
      selector:(row)=>row.email,
      sortable:true
    },
    {
              name:"Action",
              cell:(row)=>(
                        <div>
                    <button onClick={()=>editUser(row._id)} className='btn btn-primary'>
                    Edit
          </button>,
          <button onClick={()=>deleteUser(row._id,row.name)} className='btn btn-danger'>
          delete
</button>
</div>
              )
    },


  ]

 
  return (
            <div className='card'>
                      <AdminHeadder/>
          <DataTable
          title={"User Details"}
          columns={columns}
          data={filterValue}
          pagination
          fixedHeader
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Serch here..."
              className="w-25 form-control"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
          }
        />
        </div>
  )
}

export default AllUsers
