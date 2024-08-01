import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Viewfeedback() {

    useEffect(()=>{
        getAnganwadi();
        getVillage();
    },[])

    const [aid,setaid]=useState();
    const [txt,settxt]=useState("");
    const [vid,setvid]=useState();

    const [feedbacklists,setfeedbacklists]=useState([]);
    const [anganlst,setanganlst]=useState([]);
    const [villagelst,setvillagelst]=useState([]);

    function getWomenFeedback(id)
    {

        axios.get(`http://localhost:8080/getWomenFeedbackDetails/${id}`)
        .then((res)=>{
            if(res.data.length>0)
            {
                setfeedbacklists(res.data);
                settxt("");
            }
            else
            {
                //toast.error("No Feedback Present");
                setfeedbacklists([]);
                settxt("No Feedback Present from this Anganwadi");                
            }
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

    function handleSubmit(id)
    {

        axios.put(`http://localhost:8080/feedbackStatus/${id}`)
        .then((res)=>{
            if(res.data==="Status updated Successfully")
            {
                toast.success(res.data);
                getWomenFeedback(id);
            }
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

    function setId(e)
    {
        setaid(e.target.value);
        getWomenFeedback(e.target.value);
    }

  return (
    <div className='container'>
        <h4 className='text-light text-center bg-success'>Women Feedback Dashboard</h4>
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
                txt==="No Feedback Present from this Anganwadi" 
                ?
                (<h5 className='text-success text-center '>{txt}</h5>)
                :
                (
                    <>
                        <h4 className='text-light text-center bg-success'>Women Feedback List</h4>
                        <table className='table table-striped text-center'>
                            <thead>
                                <tr>
                                    <th>Women Name</th>
                                    <th>Phone Number</th>
                                    <th>Post Date</th>
                                    <th>Feedback</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    feedbacklists.map((item)=>{
                                        return(
                                            <tr>
                                                <td>{item.feedBackWomen.womenname}</td>
                                                <td>{item.feedBackWomen.phone}</td>
                                                <td>{item.date}</td>
                                                <td>{item.feedback}</td>
                                                <td><input type='button' className='btn btn-success' value="View" onClick={(e)=>(handleSubmit(item.id))} /> </td>
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
