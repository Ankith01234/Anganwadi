import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Gpanganwallet() {

    const [aid,setaid]=useState();
    const [amount,setamount]=useState();

    const [anganlst,setanganlst]=useState([]);
    const [villagelst,setvillagelst]=useState([]);
    const [amountlst,setamountlst]=useState([]);

    useEffect(()=>{
        getAnganwadi();
        getVillage();
        getAnganAmountDetails();
    },[])

    function getAnganAmountDetails()
    {
        var id=sessionStorage.getItem('gpid');
        axios.get(`http://localhost:8080/getParticularAmountDetails/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setamountlst(res.data); 
            else
                toast.error(res.data);
        })
    }

    function getVillage()
    {
        var id=sessionStorage.getItem('gpid');
        axios.get(`http://localhost:8080/getParticularVillage/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setvillagelst(res.data);
            else
                toast.error(res.data);
        })
    }

    function getAnganwadi()
    {
        var id=sessionStorage.getItem('gpid');
        axios.get(`http://localhost:8080/getParticularAngan/${id}`)
        .then((res)=>{
            setanganlst(res.data);
        })
    }

    function handleSubmit()
    {

        if(!aid || aid==0)
        {
            toast.error("Please Select the Anganwadi");
            return;  
        }

        if(!amount)
        {
            toast.error("Please Enter the Amount");
            return;   
        }
        
        const obj={amount};
        axios.post(`http://localhost:8080/addAmount/${aid}`,obj)
        .then((res)=>{
            if(res.data==="Amount added Successfully")
            {
                toast.success(res.data);  
                getAnganAmountDetails();
            }
            else
            {
                toast.error(res.data);
                return;
            }

            axios.put(`http://localhost:8080/addBalance/${aid}/${amount}`)
            .then((res)=>{
                if(res.data==="Amount Added successfully")
                    toast.success("Balance Added Successfully");
                else
                    toast.error(res.data);
            })

        })

        clearAll();

    }

    function clearAll()
    {
        setaid("");
        setamount("");
    }

  return (
    <div className='container'>
        <h4 className='bg-success text-center text-light'>Wallet Dashboard</h4>
        <div className='row'>
            <div className='col-6'>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Select Anganwadi</label>
                            <select className='form-select border border-2 border-success' onChange={(e)=>setaid(e.target.value)} value={aid}>
                                <option value={0}>--Select--</option>
                                {
                                    anganlst.map((angan)=>{
                                        return(
                                            <option value={angan.aid}>{angan.aname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Amount</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setamount(e.target.value)} value={amount} />
                        </div>
                        <div className='text-end mt-2'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <h4 className='bg-success text-light text-center'>Amount Details</h4>
                <table className='table text-center table-striped'>
                    <thead>
                        <tr>
                            <th>Anganwadi Name</th>                     
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            amountlst.map((amount)=>{
                                return(
                                    <tr>
                                        <td>{amount.angan.aname}</td>
                                        <td>{amount.amount}</td>
                                        <td>{amount.date}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <h4 className='bg-success text-center text-light mt-2'>List of Villages</h4>
            <div>
                <table className='table table-striped table-hover text-center'>
                    <thead>
                        <th>Village Id</th>
                        <th>Village Name</th>
                    </thead>
                    <tbody>
                        {
                            villagelst.map((village)=>{
                                return(
                                    <tr>
                                        <td>{village.vid}</td>
                                        <td>{village.villagename}</td>
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
