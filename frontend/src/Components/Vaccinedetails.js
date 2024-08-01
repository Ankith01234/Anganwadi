import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Vaccinedetails() {

    useEffect(()=>{
        getAnganwadi();
        getVillage();
    },[])

    const [anganlst,setanganlst]=useState([]);
    const [aid,setaid]=useState();
    const [vid,setvid]=useState();

    const [vaccinelst,setvaccinelst]=useState([]);
    const [txt,settxt]=useState("");
    const [villagelst,setvillagelst]=useState([]);

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

    function getVaccineDetails(aid)
    {
        axios.get(`http://localhost:8080/getVaccineBasedOnAngan/${aid}`)
        .then((res)=>{
            if(res.data.length>0)
            {
                setvaccinelst(res.data);   
                settxt("")             
            }
            else
            {
                setvaccinelst([]);
                settxt("No Vaccine is provided for the baby under this Anganwadi");
            }
        })
    }

    function setId(e)
    {   
        setaid(e.target.value);
        getVaccineDetails(e.target.value);
    }

  return (
    <div className='container'>
        <h4 className='text-light text-center bg-success'>Vaccine Details Dashboard</h4>
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
        <div className='card border border-2 border-success p-3 mt-3'>
            <div>
                {
                    txt==="No Vaccine is provided for the baby under this Anganwadi"
                    ?
                    (
                        <h6 className='text-success text-center'>{txt}</h6>
                    )
                    :
                    (
                        <>
                            <h4 className='text-light text-center bg-success'>Vaccine Details List</h4>
                            <table className='table table-striped text-center'>
                                <thead>
                                    <tr>
                                        <th>Women Name</th>
                                        <th>Baby Gender</th>
                                        <th>Vaccine Name</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        vaccinelst.map((item)=>{
                                            return(
                                                <tr>
                                                    <td>{item.baby.babywomen.womenname}</td>
                                                    <td>{item.baby.gender}</td>
                                                    <td>{item.vaccinename}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.status}</td>
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
    </div>
  )
}
