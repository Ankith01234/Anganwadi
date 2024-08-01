import React, { useEffect, useState } from 'react';
import taluk from '../taluk.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Admintaluk() {

    const [districtid,setdistrictid]=useState();
    const [talukname,settalukname]=useState(""); 

    const [districtlst,setdistrictlst]=useState([]);
    const [taluklst,settaluklst]=useState([]);

    useEffect(()=>{
        getDistricts();
        getTaluk();
    },[])

    function handleSubmit()
    {
        if(districtid==0)
        {
            toast.error("Please Select the District");
            return;   
        }

        if(!talukname)
        {
            toast.error("Please Select the Talukname");
            return;
        }

        axios.post(`http://localhost:8080/addTaluk/${districtid}/${talukname}`)
        .then((res)=>{
            if(res.data==="Taluk added successfully")
            {
                toast.success(res.data);
                getTaluk();
            }
            else
                toast.error(res.data);

            clearAll();
        })

    }

    function clearAll()
    {
        setdistrictid("");
        settalukname("");
    }

    function getTaluk()
    {
        axios.get("http://localhost:8080/getAllTaluks")
        .then((res)=>{
            settaluklst(res.data);
        })
    }

    function getDistricts()
    {
        axios.get("http://localhost:8080/getAllDistricts")
        .then((res)=>{
            setdistrictlst(res.data);
        })
    }

  return (
    <div className='container'>
        <h4 className='bg-success text-light text-center'>Taluk Dashboard</h4>
        <div className='row align-items-center mb-5'>
            <div className='col-6'>
                <img src={taluk} style={{'width':'550px','height':'400px','border':'2px solid #198754'}} alt="" />
            </div>
            <div className='col-6'>
                <h4 className='text-center text-light bg-success'>Taluk Details</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Select the District</label>
                            <select className="form-select border border-2 border-success" onChange={(e)=>setdistrictid(e.target.value)} value={districtid}>
                                <option value={0}>--Select--</option>
                                {
                                    districtlst.map((item)=>{
                                        return(
                                            <option value={item.districtid}>{item.districtname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Taluk Name</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>settalukname(e.target.value)} value={talukname} />
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4 className='text-center text-light bg-success mt-3'>Taluk Lists</h4>
                <div>
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>                                                                
                                <th>District Name</th>
                                <th>Taluk Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                taluklst.map((item)=>{
                                    return(
                                        <tr>                                                                                    
                                            <td>{item.district.districtname}</td>
                                            <td>{item.talukname}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
