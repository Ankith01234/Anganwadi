import React, { useEffect, useState } from 'react';
import anganwadi from '../anganwadi.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Gpanganwadi() {

    const [vlst,setvlst]=useState([]);

    const [vid,setvid]=useState();
    const [aname,setaname]=useState("");
    const [phone,setphone]=useState("");
    const [address,setaddress]=useState("");
    const [gpid,setgpid]=useState();
    const [anganemail,setanganemail]=useState("");

    const [anganlst,setanganlst]=useState([]);

    useEffect(()=>{
        getVillage();
        getAnganwadi();
    },[])

    function getVillage()
    {
        var id=sessionStorage.getItem('gpid');
        setgpid(id);
        axios.get(`http://localhost:8080/getParticularVillage/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setvlst(res.data);
            else
                toast.error(res.data);
        })
    }

    function handleSubmit()
    {

        if(!vid || vid==0)
        {
            toast.error("Please Select the Village");
            return;   
        }

        if(!aname)
        {
            toast.error("Please Enter the Anganwadi Name");
            return
        }

        if(!phone)
        {
            toast.error("Please Enter the Anganwadi contacts");
            return;
        }

        if(!anganemail)
        {
            toast.error("Please Enter the Anganwadi Email");
            return;
        }

        if(!address)
        {
            toast.error("Please Enter the Anganwadi Address");
            return;
        }

        const obj={aname,phone,address,anganemail};

        axios.post(`http://localhost:8080/addAnganwadi/${vid}`,obj)
        .then((res)=>{
            if(res.data==="Anganwadi Added successfully")
            {
                toast.success(res.data);
                getAnganwadi();
            }
            else
                toast.error(res.data);

            clearAll();
        })

    }

    function clearAll()
    {
        setaname("");
        setphone("");
        setaddress("");
        setvid("");
    }

    function getAnganwadi()
    {
        var id=sessionStorage.getItem('gpid');
        axios.get(`http://localhost:8080/getParticularAngan/${id}`)
        .then((res)=>{
            setanganlst(res.data);
        })
    }

  return (
    <div className='container'>
        <h4 className='bg-success text-light text-center'>Anganwadi Dashboard</h4>
        <div className='row mt-3 align-items-center'>
            <div className='col-6'>
                <img src={anganwadi} className='img-fluid' alt="" style={{'width':'550px','height':'400px','border':'2px solid #198754'}} />
            </div>
            <div className='col-6'>
                <h4 className='bg-success text-light text-center'>Anganwadi Details</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Gram Panchayat Id</label>
                            <input type='text' className='form-control border border-2 border-success' value={gpid} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Select the Village</label>
                            <select className='form-select border border-2 border-success' onChange={(e)=>setvid(e.target.value)} value={vid}>
                                <option value={0}>--Select--</option>
                                {
                                    vlst.map((item)=>{
                                        return(
                                            <option value={item.vid}>{item.villagename}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label>Enter the Anganwadi</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setaname(e.target.value)} value={aname} /> 
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Phone Number</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setphone(e.target.value)} value={phone} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Email</label>
                            <input type="text" className='form-control border border-2 border-success' onChange={(e)=>setanganemail(e.target.value)} value={anganemail} />
                        </div>
                        <div className='mt-2'>
                            <label className='mt-2'>Enter the Address</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setaddress(e.target.value)} value={address} />
                        </div>
                        <div className='text-end mt-2'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-3'>
            <h4 className='bg-success text-light text-center'>Anganwadi Lists</h4>
            <div>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>Slno</th>
                            <th>Anganwadi Name</th>
                            <th>Village Name</th>
                            <th>Anganwadi Phone</th>
                            <th>Anganwadi Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            anganlst.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.aname}</td>
                                        <td>{item.village.villagename}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
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
