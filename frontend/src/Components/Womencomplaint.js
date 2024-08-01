import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Womencomplaint() {

  const [complaint,setcomplaint]=useState("");

  function handleSubmit()
  {
    if(!complaint)
    {
      toast.error("Please Fill the complaint Field");
      return;
    }

    const obj={complaint};

    var id=sessionStorage.getItem('womenid');

    axios.post(`http://localhost:8080/addComplaint/${id}`,obj)
    .then((res)=>{
        if(res.data==="Complaint added successfully")
        {
          toast.success(res.data);
          clearAll();
        }
        else
          toast.error(res.data);
    })

  }

  function clearAll()
  {
    setcomplaint("");
  }

  return (
    <div className='container'>
        <h4 className='text-light text-center bg-success'>Complaints Dashboard</h4>
        <div className='card border border-2 border-success p-3'>
            <div>
                <div>
                    <label className='form-label'>Complaint Textfield</label>
                    <textarea className='form-control border border-2 border-success' onChange={(e)=>setcomplaint(e.target.value)} value={complaint}></textarea>
                </div>
                <div className='mt-2 text-end'>
                    <input type='button' className='btn btn-success' onClick={handleSubmit} value="Submit" />
                </div>
            </div>
        </div>
    </div>
  )
}
