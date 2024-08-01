import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Viewcomplaint() {

    useEffect(()=>{
        getAnganwadi();
        getVillage();
    },[])

    const [complainlst,setcomplainlst]=useState([]);
    const [anganlst,setanganlst]=useState([]);
    const [vid,setvid]=useState();

    const [aid,setaid]=useState();
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

    function getWomenComplaint(id)
    {

        axios.get(`http://localhost:8080/getWomenComplaintDetails/${id}`)
        .then((res)=>{        
            if(res.data.length > 0)
            {
                setcomplainlst(res.data);
                settxt("");
            }
            else
            {
                setcomplainlst([]);
                settxt("No complaints found for this Anganwadi");
            }
        })

    }

    function handleSubmit(id)
    {
        axios.put(`http://localhost:8080/updateComplaintStatus/${id}`)
        .then((res)=>{
            if(res.data==="Status updated successfully")
            {
                toast.success(res.data);
                getWomenComplaint(id);
            }
            else
                toast.error(res.data);
        })
    }

    function setId(e)
    {
        setaid(e.target.value);
        getWomenComplaint(e.target.value);
    }

  return (
    <div className='container'>        
        <h4 className='text-light text-center bg-success'>Complaint Dashboard</h4>
        <div>
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
        </div>
        <div className='card border border-2 border-success p-3 mt-4'>
            {
                txt==="No complaints found for this Anganwadi"
                ?
                (
                    <h6 className='text-center text-success'>{txt}</h6>
                )
                :
                (
                    <>
                        <h4 className='text-light text-center bg-success'>Complaint List</h4>
                        <table className='table table-striped text-center'>
                            <thead>
                                <tr>
                                    <th>Women Name</th>
                                    <th>Phone Number</th>
                                    <th>Post Complaint Date</th>
                                    <th>Complaint</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    complainlst.map((item)=>{
                                        return(
                                            <tr>
                                                <td>{item.complainwomen.womenname}</td>
                                                <td>{item.complainwomen.phone}</td>
                                                <td>{item.date}</td>
                                                <td>{item.complaint}</td>
                                                <td><input type='button' className='btn btn-success' value="Submit" onClick={(e)=>(handleSubmit(item.id))} /> </td>
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
