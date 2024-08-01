import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Forgotpassword() {

    const [email,setemail]=useState("");
    const [otp,setotp]=useState();
    const [otpflag,setotpflag]=useState(false);

    const navigate = useNavigate();

    function handleSubmit()
    {
        sessionStorage.setItem('email',email);
        var emailid=sessionStorage.getItem('email');
        setemail("");
        setotp("");
        axios.post(`http://localhost:8080/sendOtp/${emailid}`)
        .then((res)=>{
            if(res.data==="Otp Sent to your E-mail Please Check")
            {
                setotpflag(true);
                toast.success(res.data);                
            }
            else
            {
                toast.error(res.data);
            }
        })

    }

    function handleOk()
    {
        
        axios.get(`http://localhost:8080/chkOtp/${otp}`)
        .then((res)=>{
            if(res.data==="Entered Correct Otp")
            {
                navigate("/newpassword");
                setotp("");
                setemail("");
            }
            else
            {
                toast.error(res.data);
                setotpflag(false);
                setotp("");
            }
        })
    }

  return (
    <div>
        <div className='text-end m-3'>
            <Link className='btn btn-success' to="/">Logout</Link>
        </div>
        <h4 className='text-light text-center bg-success'>Forgot Password Dashboard</h4>
        <div className='container'>
            <div className='card border border-2 border-success p-3'>
                {
                    otpflag
                    ?
                    (
                        <div>
                            <div>
                                <label className='form-label'>Enter the Otp</label>
                                <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setotp(e.target.value)} value={otp} />
                            </div>
                            <div className='text-end mt-2'>
                                <input type='button' className='btn btn-success' value="Ok" onClick={handleOk} />
                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <div>
                                <label className='form-label'>Enter the Email</label>
                                <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setemail(e.target.value)} value={email} />
                            </div>
                            <div className='text-end mt-2'>
                                <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                            </div>
                        </div>
                    )
                }                
            </div>
        </div>
    </div>
  )
}
