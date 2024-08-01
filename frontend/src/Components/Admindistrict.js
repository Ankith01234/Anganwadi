import React, { useEffect, useState } from 'react';
import district from '../district.webp';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Admindistrict() {

    const [districtname,setdistrictname]=useState("");
    const [districtlst,setdistrictlst]=useState([]);

    useEffect(()=>{
        getDistricts();
    },[])

    function getDistricts()
    {
        axios.get("http://localhost:8080/getAllDistricts")
        .then((res)=>{
            setdistrictlst(res.data);
            console.log(districtlst);
        })
    }

    function handleSubmit()
    {

        if(!districtname)
        {
            toast.error("District Name is Required");
            return;
        }
        
        axios.post(`http://localhost:8080/addDistrict/${districtname}`)
        .then((res)=>{
            if(res.data==="District Name Added Successfully")
            {
                getDistricts();
                toast.success(res.data);
            }
            else
                toast.error(res.data);
        })
        clearAll();
    }

    function clearAll()
    {
        setdistrictname("");
    }

  return (
    <div className='container'>
        <h4 className='bg-success text-light text-center'>District Dashboard</h4>
        <div className='row align-items-center mb-3'>
            <div className='col-6'>
                <img src={district} style={{'width':'550px','height':'400px','border':'2px solid #198754'}} alt="" />                        
            </div>
            <div className='col-6'>
                <h4 className='bg-success text-light text-center'>District Details</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Enter the District Name</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setdistrictname(e.target.value)} value={districtname} />
                        </div>
                        <div className='text-end mt-3'>
                            <input type='button' value="Submit" className='btn btn-success' onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h4 className='bg-success text-light text-center'>District Lists</h4>
            <div>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>District Id</th>
                            <th>District Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            districtlst.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item.districtid}</td>
                                        <td>{item.districtname}</td>
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
