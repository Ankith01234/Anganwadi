import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Newpassword() {

    const [newpass,setnewpass]=useState("");
    const [confirmpass,setconfirmpass]=useState("");

    const navigate=useNavigate();

    function handleChange()
    {

        if(newpass==confirmpass)
        {
            var email=sessionStorage.getItem('email');

            axios.put(`http://localhost:8080/changePassword/${email}/${newpass}`)
            .then((res)=>{
                if(res.data==="Password Changed Suucessfully")
                    navigate("/");
                else
                    toast.error(res.data);
            })

        }
        else
        {
            toast.error("Password doesn't Match");
        }

    }

  return (
    <div>
        <div className='text-end m-3'>
            <Link className='btn btn-success' to="/">Logout</Link>
        </div>
        <h4 className='text-light text-center bg-success'>Newpassword Dashboard</h4>
        <div className='container'>
            <div className='card border border-2 border-success p-3'>
                <div>
                    <div>
                        <label className='form-label'>Enter the New Password</label>
                        <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setnewpass(e.target.value)} value={newpass}  />
                    </div>
                    <div className='mt-2'>
                        <label className='form-label'>Confirm Password</label>
                        <input type='password' className='form-control border border-2 border-success' onChange={(e)=>setconfirmpass(e.target.value)} value={confirmpass} />
                    </div>
                    <div className='mt-2 text-end'>
                        <input type='button' className='btn btn-success' value="Submit" onClick={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
