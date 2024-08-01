import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Caretakerwomen() {

    const [womenname,setwomenname]=useState("");
    const [age,setage]=useState();
    const [address,setaddress]=useState("");
    const [phone,setphone]=useState("");

    const [womenLst,setwomenLst]=useState([]);

    useEffect(()=>{
        getWomen();
    },[])

    function getWomen()
    {
        var id=sessionStorage.getItem('staffid');

        axios.get(`http://localhost:8080/getWomens/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setwomenLst(res.data);
            else
                toast.error(res.data);
        })

    }

    function handleSubmit()
    {
        var id=sessionStorage.getItem('staffid');

        const obj={womenname,age,address,phone};

        axios.post(`http://localhost:8080/addWomen/${id}`,obj)
        .then((res)=>{
            if(res.data==="Women added Successfully")
            {
                toast.success(res.data);
                getWomen();
                clearAll();
            }
            else
                toast.error(res.data);
        })

    }

    function clearAll()
    {
        setwomenname("");
        setage("");
        setaddress("");
        setphone("");
    }

  return (
    <div className='container'>
        <h4 className='text-center text-light bg-success'>Women Dashboard</h4>
        <div className='row'>
            <div className='col-4'>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Enter the Women Name</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setwomenname(e.target.value)} value={womenname} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Women Age</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setage(e.target.value)} value={age} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Women Address</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setaddress(e.target.value)} value={address} />                            
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Women Phone Number</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setphone(e.target.value)} value={phone} />                            
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-8'>
                <h4 className='text-center text-light bg-success'>Womens List</h4>
                <div>
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>
                                <th>Name</th>                                
                                <th>Age</th>
                                <th>Phone Number</th>
                                <th>Address</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                womenLst.map((item,index)=>(
                                    <tr key={index}>                                        
                                        <td>{item.womenname}</td>                                        
                                        <td>{item.age}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>                                        
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
