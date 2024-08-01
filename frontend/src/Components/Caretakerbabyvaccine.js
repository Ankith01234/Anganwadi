import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Caretakerbabyvaccine() {

    useEffect(()=>{
        getWomens();  
        getBaby();  
    },[])

    const [womenLst,setwomenLst]=useState([]);
    const [babylst,setbabylst]=useState([]);
    const [vaccinelst,setvaccinelst]=useState([]);

    const [womenid,setwomenid]=useState();
    const [womenid2,setwomenid2]=useState();
    const [babyid,setbabyid]=useState();
    const [babyid2,setbabyid2]=useState();

    const [vaccinename,setvaccinename]=useState("");    

    function getWomens()
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

    function getBaby()
    {
        axios.get("http://localhost:8080/getAllBaby")
        .then((res)=>{
            setbabylst(res.data);
        })
    }

    function handleSubmit()
    {
        if(!womenid || womenid==0)
        {
            toast.error("Please Select the Women");
            return;        
        }

        if(!babyid || babyid==0)
        {
            toast.error("Please Select the Baby");
            return;
        }

        if(!vaccinename)
        {
            toast.error("Please Enter the vaccine Name");
            return
        }

        const obj={vaccinename};

        var staffid=sessionStorage.getItem('staffid');

        axios.post(`http://localhost:8080/addVaccine/${staffid}/${babyid}`,obj)
        .then((res)=>{
            if(res.data==="Vaccine is Provided to Baby")
            {
                toast.success(res.data);
                clearAll();
            }
        })

    }

    function clearAll()
    {
        setwomenid("");
        setbabyid("");
        setvaccinename("");
    }

    function getBabyVaccine(id)
    {   
        axios.get(`http://localhost:8080/getBabyVaccine/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
            {
                setvaccinelst(res.data);
            }
            else
                toast.error(res.data);
        })
    }

    function setId(e)
    {
        setbabyid2(e.target.value);
        getBabyVaccine(e.target.value);
    }

  return (
    <div className='container'>
        <h4 className='text-center text-light bg-success'>Baby Vaccine Dashboard</h4>
        <div className='row'>
            <div className='col-6'>
                <h4 className='text-center text-light bg-success'>Vaccine Details</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Select the Women</label>
                            <select className='form-select border border-2 border-success' onChange={(e)=>setwomenid(e.target.value)} value={womenid}>
                                <option value={0}>--Select--</option>
                                {
                                    womenLst.map((item)=>{
                                        return(
                                            <option value={item.womenid}>{item.womenname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Select the Baby Name</label>
                            <select className='form-select border border-2 border-success' onChange={(e)=>setbabyid(e.target.value)} value={babyid}>
                                <option value={0}>--Select--</option>
                                {                                    
                                    babylst.filter((item)=>(item.babywomen.womenid==womenid)).map((item)=>{
                                        return(
                                            <option value={item.babyid}>{"Id:"+item.babyid}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Vaccine Name</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setvaccinename(e.target.value)} value={vaccinename} />
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <h4 className='text-center text-light bg-success'>Get Vaccine Details</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Select the Women</label>
                            <select className='form-select border border-2 border-success' onChange={(e)=>setwomenid2(e.target.value)} value={womenid2}>
                                <option value={0}>--Select--</option>
                                {
                                    womenLst.map((item)=>{
                                        return(
                                            <option value={item.womenid}>{item.womenname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label className='form-label'>Select the Baby Name</label>
                            <select className='form-select border border-2 border-success' onChange={setId} value={babyid2}>
                                <option value={0}>--Select--</option>
                                {                                    
                                    babylst.filter((item)=>(item.babywomen.womenid==womenid2)).map((item)=>{
                                        return(
                                            <option value={item.babyid}>{"Id:"+item.babyid}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4 className='text-center text-light bg-success mt-3'>Baby Vaccine Details</h4>
                {                    
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>
                                <th>Vaccine Name</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                vaccinelst.length==0
                                ?
                                (
                                    ""// <h5>Vaccine is not provided to this baby</h5>
                                )
                                :
                                (
                                    vaccinelst.map((item)=>{
                                        return(
                                            <tr>
                                                <td>{item.vaccinename}</td>
                                                <td>{item.date}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>                    
                }                
            </div>
        </div>
    </div>
  )
}
