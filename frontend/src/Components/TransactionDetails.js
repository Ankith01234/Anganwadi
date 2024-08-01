import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function TransactionDetails() {

    const [anganlst,setanganlst]=useState([]);
    const [aid,setaid]=useState();
    const [txt,settxt]=useState("");

    const [transactionlst,settransactionlst]=useState([]);
    const [villagelst,setvillagelst]=useState([]);
    const [vid,setvid]=useState();

    useEffect(()=>{
        getAnganwadi();
        getVillage();
    },[])

    function getAnganwadi()
    {
        var id=sessionStorage.getItem('gpid');        
        axios.get(`http://localhost:8080/getParticularAngan/${id}`)
        .then((res)=>{            
            setanganlst(res.data);
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

    function getTransactionDetails(id)
    {
        axios.get(`http://localhost:8080/getTransactionDetails/${id}`)
        .then((res)=>{
            if(res.data.length>0)
            {
                settransactionlst(res.data);
                settxt("");
            }
            else
            {
                settxt("This Anganwadi has No Transaction");
                settransactionlst([]);
            }
        })
    }

    function setId(e)
    {
        setaid(e.target.value);
        getTransactionDetails(e.target.value);
    }

  return (
    <div className='container'>
        <h4 className='text-light text-center bg-success'>Transaction Dashboard</h4>
        <div className='card border border-2 border-success p-3'>
            <div>
                <div>
                    <label className='form-label'>Select the Village</label>
                    <select className='form-select border border-2 border-success' onChange={(e)=>setvid(e.target.value)} value={vid}>
                        <option value={0}>--Select--</option>
                        {
                            villagelst.map((item)=>{
                                return(
                                    <option value={item.vid}>{item.villagename}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <label className='form-label'>Select the Anganwadi</label>
                    <select className='form-select border border-2 border-success' onChange={setId} value={aid}>
                        <option value={0}>--Select--</option>
                        {
                            anganlst.filter((item)=>(item.village.vid==vid)).map((item)=>{
                                return(
                                    <option value={item.aid}>{item.aname}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
        <div className='card border border-2 border-success p-3 mt-4'>
            {
                txt==="This Anganwadi has No Transaction"
                ?
                (
                    <h6 className='text-center text-success'>{txt}</h6>
                )
                :
                (
                    <>
                        <h4 className='text-light text-center bg-success'>Transaction Details List</h4>
                        <table className='table table-striped text-center'>
                            <thead>
                                <tr>
                                    <th>Food Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transactionlst.map((item)=>{
                                        return(
                                            <tr>
                                                <td>{item.foodname}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
                )
            }            
        </div>
    </div>
  )
}
