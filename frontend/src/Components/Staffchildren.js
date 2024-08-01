import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Staffchildren() {

    const [malecount,setmalecount]=useState();
    const [femalecount,setfemalecount]=useState();

    const [anganname,setAnganname]=useState("");
    const [totalStudents,settotalStudents]=useState({});

    useEffect(()=>{
        getAnganName();
        getAnganChildren();        
    },[])

    function getAnganChildren()
    {
        var id=sessionStorage.getItem('staffid');
        axios.get(`http://localhost:8080/getChildrens/${id}`)
        .then((res)=>{
            if(res.data.length==0)
                toast.error("No students found in this anganwadi");
            else if(typeof res.data==='object')
                settotalStudents(res.data);
            else
                toast.error(res.data);
        })

    }

    function getAnganName()
    {
        var id=sessionStorage.getItem('staffid');

        axios.get(`http://localhost:8080/getAnganNameDetails/${id}`)
        .then((res)=>{
            if(res.data==="Anganwadi Staff Mismatch")
                toast.error(res.data);
            else
            {
                setAnganname(res.data);
            }
        })

    }

    function handleSubmit()
    {
        if(!malecount)
        {
            toast.error("Please enter male count");
            return;
        }

        if(!femalecount)
        {
            toast.error("Please enter female count");
            return;
        }

        const obj={malecount,femalecount};

        var id=sessionStorage.getItem('staffid');

        axios.post(`http://localhost:8080/addChildrens/${id}`,obj)
        .then((res)=>{
            if(res.data==="Childrens added successfully")
            {
                toast.success(res.data);
                getAnganChildren();
            }
            else
                toast.error(res.data);  
        })

        clearAll();

    }

    function clearAll()
    {
        setmalecount("");
        setfemalecount("");
    }

  return (
    <div className='container'>
        <h4 className='text-center text-light bg-success'>Children Dashboard</h4>
        <div>
            <div className='row align-items-center'>
                <div className='col-6'>
                    <div className='card border border-2 border-success p-3'>
                        <div>
                            <div>
                                <label className='form-label'>Anganwadi Name</label>
                                <input type='text' className='form-control border border-2 border-success' value={anganname}  />
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Enter the Number of Male Childrens</label>
                                <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setmalecount(e.target.value)} value={malecount} />
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Enter the Number of Female Childrens</label>
                                <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setfemalecount(e.target.value)} value={femalecount} />
                            </div>
                            <div className='mt-2 text-end'>
                                <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>
                                <th>Anganwadi Name</th>
                                <th>Anganwadi Staff Name</th>
                                <th>Male Childrens</th>
                                <th>Female Childrens</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{anganname}</td>
                                <td>{totalStudents.anganwadistaff?.staffname}</td>
                                <td>{totalStudents.malecount}</td>
                                <td>{totalStudents.femalecount}</td>
                            </tr>            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
