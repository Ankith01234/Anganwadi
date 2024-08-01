import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function CaretakerproNutrition() {

    const [womenid,setwomenid]=useState();

    useEffect(()=>{
        getWomen();
        getNutrition();
    },[])

    const [womenLst,setwomenLst]=useState([]);
    const [nutritionName,setnutritionName]=useState("");

    const [nutritionlst,setnutritionlst]=useState([]);

    function getNutrition()
    {
        var id=sessionStorage.getItem('staffid');

        axios.get(`http://localhost:8080/getNutrition/${id}`,)
        .then((res)=>{
            setnutritionlst(res.data);
        })
    }

    function getWomen()
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

    function handleSubmit()
    {
        if(!womenid || womenid==0)
        {
            toast.error('Please select a Women');
            return;
        }

        if(!nutritionName)
        {
            toast.error('Please enter the Nutrition Food Name');
            return;
        }

        var id=sessionStorage.getItem('staffid');

        const obj={nutritionName};

        axios.post(`http://localhost:8080/addNutrition/${id}/${womenid}`,obj)
        .then((res)=>{
            if(res.data==="Nutrition Provided Successfully")
            {
                toast.success(res.data);
                getNutrition();
                clearAll();
            }
            else
                toast.error(res.data);
        })

    }

    function clearAll()
    {
        setwomenid("");
        setnutritionName("");
    }

  return (
    <div className='container'>
        <h4 className='text-center text-light bg-success'>Nutrition Dashboard</h4>
        <div className='row'>
            <div className='col-5'>
                <h4 className='text-light text-center bg-success mt-2'>Nutrition Details</h4>
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
                            <label className='form-label'>Please Enter the Nutrition Food</label>
                            <textarea className='form-control border border-2 border-success' onChange={(e)=>setnutritionName(e.target.value)} value={nutritionName}></textarea>
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-7'>
                <h4 className='text-light text-center bg-success mt-2'>List of Nutrition Provided Food</h4>
                <table className='table text-center table-striped'>
                    <thead>
                        <tr>
                            <th>Women Name</th>
                            <th>Nutrition Name</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            nutritionlst.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item.women.womenname}</td>
                                        <td>{item.nutritionName}</td>
                                        <td>{item.status}</td>
                                        <td>{item.date}</td>
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
