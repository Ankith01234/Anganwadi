import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Womenpostfeedback() {

    const [feedback,setfeedback]=useState("");

    function handleSubmit()
    {

        if(!feedback)
        {
            toast.error("Please Enter the Feedback Field");
            return;
        }

        const obj={feedback};

        var id=sessionStorage.getItem('womenid');

        axios.post(`http://localhost:8080/addFeedback/${id}`,obj)
        .then((res)=>{
            if(res.data==="Feedback Saved Successfully")
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
        setfeedback("");
    }

  return (
    <div className='container'>
        <h4 className='text-light text-center bg-success'>Feedback Dashboard</h4>
        <div>
            <div className='card border border-2 border-success p-3'>
                <div>
                    <div>
                        <label className='form-label'>Please Give the Feedback on Caretaker</label>
                        <textarea className='border border-2 border-success form-control' onChange={(e)=>setfeedback(e.target.value)} value={feedback} > 
                        </textarea>
                    </div>
                    <div className='mt-2 text-end'>
                        <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
