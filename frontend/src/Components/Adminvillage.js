import React, { useEffect, useState } from 'react';
import village from '../village.webp';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Adminvillage() {

  const [gpid,setgpid]=useState();
  const [villagename,setvillagename]=useState("");

  const [gplst,setgplst]=useState([]);
  const [villagelst,setvillagelst]=useState([]); 

  useEffect(()=>{
    getAllGp();
    getVillage();
  },[])

  function getVillage()
  {

      axios.get("http://localhost:8080/getAllVillage")
      .then((res)=>{
          setvillagelst(res.data);
      })

  }

  function getAllGp()
  {
      
      axios.get("http://localhost:8080/getAllGramPanchayat")
      .then((res)=>{
          setgplst(res.data);
      })

  }

  function handleSubmit()
  {

    if(gpid==0)
    {
        toast.error("Please Select the Gram Panchayat");
        return;         
    }

    if(!villagename)
    {
        toast.error("Please Fill the village Name");
        return; 
    }

    axios.post(`http://localhost:8080/addVillage/${gpid}/${villagename}`)
    .then((res)=>{
        if(res.data==="Village Name added successfuly")
        {
          toast.success(res.data);
          getVillage();
        }
        else
          toast.error(res.data);
    })

    clearAll();

  }

  function clearAll()
  {
      setgpid("");
      setvillagename("");
  }

  return (
    <div className='container'>
        <h4 className='bg-success text-center text-light'>Village Dashboard</h4>
        <div className='row align-items-center'>
            <div className='col-6'>
                <img src={village}  className='img-fluid' style={{'width':'550px','height':'400px','border':'2px solid #198754'}} alt="" />
            </div>
            <div className='col-6'>
                <h4 className='bg-success text-light text-center'>Village Details</h4>
                <div className='card border border-2 border-success p-3'>
                  <div>
                      <div>
                          <label className='form-label'>Select the Gram Panchayat</label>
                          <select className='form-select border border-2 border-success' onChange={(e)=>setgpid(e.target.value)} value={gpid}>
                              <option value={0}>--Select--</option>
                              {
                                  gplst.map((item)=>{
                                    return(
                                      <option value={item.id}>{item.gpname}</option>
                                    )
                                  })
                              }                      
                          </select>
                      </div>
                      <div className='mt-2'>
                          <label className='form-label'>Enter the Village Name</label>
                          <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setvillagename(e.target.value)} value={villagename} />
                      </div>
                      <div className='mt-2 text-end'>
                          <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <div>
            <h4 className='bg-success text-light text-center mt-3'>Village Lists</h4>
            <div>
              <table className='table table-striped text-center'>
                  <thead>
                      <tr>                     
                          <th>Gram Panchayat Name</th>
                          <th>Village Name</th>                          
                      </tr>
                  </thead>
                  <tbody>
                      {
                        villagelst.map((item)=>{
                          return(
                            <tr>
                                <td>{item.grampanchayat.gpname}</td>                                
                                <td>{item.villagename}</td>                                
                            </tr>
                          )
                        })
                      }
                  </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}
