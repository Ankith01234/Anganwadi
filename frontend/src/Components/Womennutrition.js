import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Womennutrition() {

    useEffect(()=>{
        getWomenNutrition();
    },[])

    const [womennutlst,setwomennutlst]=useState([]);

    function getWomenNutrition()
    {

        var id=sessionStorage.getItem('womenid');

        axios.get(`http://localhost:8080/getNutritionBasedOnWomen/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
            {
                setwomennutlst(res.data);
            }
            else
                toast.error(res.data);
        })
    }

    function handleReceived(id)
    {
        axios.put(`http://localhost:8080/nutritionStatusUpdate/${id}`)
        .then((res)=>{
            if(res.data==="Status Updated Successfully")
            {
                toast.success(res.data);
                getWomenNutrition();
            }
            else
                toast.success(res.data);
        })
    }

  return (
    <div className='container'>
        <h4 className='bg-success text-light text-center'>Women Nutrition Dashboard</h4>
        <div>
            <table className='table table-striped text-center table-hover'>
                <thead>
                    <tr>
                        <th>Women Name</th>
                        <th>Nutrition Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        womennutlst.map((item)=>{
                            return(
                                <tr>
                                    <td>{item.women.womenname}</td>
                                    <td>{item.nutritionName}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    {
                                        item.status==='Provided'
                                        ?
                                        (<td><input type='button' className='btn btn-success' value="Received" onClick={(e)=>(handleReceived(item.id))} /></td>)
                                        :
                                        ("")
                                    }                                    
                                </tr>
                            )
                        })
                    }                    
                </tbody>
            </table>
        </div>
    </div>
  )
}
