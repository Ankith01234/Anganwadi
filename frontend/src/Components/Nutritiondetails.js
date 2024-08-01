import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Nutritiondetails() {

    useEffect(()=>{
        getAnganwadi();
        getVillage();
    },[])

    const [aid,setaid]=useState();
    const [txt,settxt]=useState("");
    const [vid,setvid]=useState();

    const [anganlst,setanganlst]=useState([]);
    const [nutritionlst,setnutrtionlst]=useState([]);
    const [villagelst,setvillagelst]=useState([]);

    function getAnganwadi()
    {        
        var id=sessionStorage.getItem('gpid');        
        axios.get(`http://localhost:8080/getParticularAngan/${id}`)
        .then((res)=>{            
            setanganlst(res.data);
        })
    }

    function getNutritionDetails(id)
    {

        axios.get(`http://localhost:8080/getNutritionsById/${id}`)
        .then((res)=>{
            if(res.data.length>0)
            {
                setnutrtionlst(res.data);
                settxt("");
            }
            else
            {
                setnutrtionlst("");
                settxt("No Nutrition is provided for women under this Anganwadi");
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

    function setId(e)
    {
        setaid(e.target.value);
        getNutritionDetails(e.target.value);
    }

  return (
    <div className='container'>
        <h4 className='text-center text-light bg-success'>Nutrition Details Dashboard</h4>
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
            <div>                
                {
                    txt==="No Nutrition is provided for women under this Anganwadi"
                    ?
                    (
                        <h6 className='text-center text-success'>{txt}</h6>
                    )
                    :
                    (
                        <>
                            <h4 className='text-light text-center bg-success'>Nutrition Details Lists</h4>
                            <table className='table table-striped text-center'>
                                <thead>
                                    <tr>
                                        <th>Women Name</th>
                                        <th>Nutrition Name</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {                                                           
                                        nutritionlst.map((item)=>{
                                            return(
                                                <tr>
                                                    <td>{item.women.womenname}</td>
                                                    <td>{item.nutritionName}</td>
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
