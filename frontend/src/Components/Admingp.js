import React, { useEffect, useState } from 'react';
import gp from '../Grampanchayat.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Admingp() {

    const [talukid,settalukid]=useState();
    const [gpname,setgpname]=useState("");
    const [gmail,setgmail]=useState("");
    const [phno,setphno]=useState("");
    const [address,setaddress]=useState("");

    const [taluklst,settaluklst]=useState([]);
    const [gplst,setgplst]=useState([]);

    useEffect(()=>{
        getTaluk();
        getGp();
    },[])

    function getTaluk()
    {
        axios.get("http://localhost:8080/getAllTaluks")
        .then((res)=>{
            settaluklst(res.data);
        })
    }

    function handleSubmit()
    {
        if(talukid==0)
        {
            toast.error("Please select the Taluk");
            return;
        }

        if(!gpname)
        {
            toast.error("Please Enter the Gram Panchayat name");
            return;
        }

        if(!gmail)
        {
            toast.error("Please Fill the Email");
            return;
        }

        if(!phno)
        {
            toast.error("Please Fill the Phone Number");
            return;   
        }

        if(!address)
        {
            toast.error("Please Fill the Address");
            return;
        } 

        const obj={gpname,gmail,phno,address};

        axios.post(`http://localhost:8080/addGramPanchayat/${talukid}`,obj)
        .then((res)=>{
            if(res.data==="Gram Panchayat added Successfully")   
            {         
                toast.success(res.data);                
                getGp();
            }
            else
                toast.error(res.data);
        })

        clearAll();

    }

    function clearAll()
    {
        settalukid("");
        setgpname("");
        setgmail("");
        setaddress("");
        setphno("");
    }

    function getGp()
    {
        
        axios.get("http://localhost:8080/getAllGramPanchayat")
        .then((res)=>{
            setgplst(res.data);
        })

    }

  return (
    <div className='container'>
       <h4 className='bg-success text-light text-center'>Gram Panchayat Dashboard</h4>
       <div className='row align-items-center'>
            <div className='col-6'>
                <img src={gp} style={{'width':'550px','height':'400px','border':'2px solid #198754'}} alt="" />
            </div>
            <div className='col-6'>
                <h4 className='text-light text-center bg-success'>Gram Panchayat Details</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Select the Taluk</label>
                            <select className='form-select border border-2 border-success' onChange={(e)=>settalukid(e.target.value)} value={talukid}>
                                <option value={0}>--Select--</option>
                                {
                                    taluklst.map((item)=>{
                                        return(
                                            <option value={item.talukid}>{item.talukname}</option>
                                        )
                                    })
                                }
                            </select>                            
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Gram Panchayat Name</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setgpname(e.target.value)} value={gpname} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Gmail</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setgmail(e.target.value)} value={gmail} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Phone Number</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setphno(e.target.value)} value={phno} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the address</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setaddress(e.target.value)} value={address} />
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <div>
            <h4 className='text-center text-light bg-success mt-3'>Gram Panchayat Lists</h4>
            <div>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>         
                            <th>Taluk Name</th>               
                            <th>Gram Panchayat Name</th>                            
                        </tr>
                    </thead>
                    <tbody>                        
                        {
                            gplst.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item.taluk.talukname}</td>                                    
                                        <td>{item.gpname}</td>                                        
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
