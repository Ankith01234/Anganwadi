import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Womenbabyvaccine() {

    useEffect(()=>{
        getVaccine();
    },[])

    const [getVaccineLst,setgetVaccineLst]=useState([]);

    function getVaccine()
    {
        var id=sessionStorage.getItem('womenid');

        axios.get(`http://localhost:8080/getVaccineBasedOnBaby/${id}`)
        .then((res)=>{
            if(typeof res.data==='object' && res.data.length==0)
            {
                toast.error("This Mother haven't given birth to a baby");
                return;
            }
            else if(typeof res.data==='object')
            {
                setgetVaccineLst(res.data);
            }            
        })

    }

    function handleReceived(id)
    {
        axios.put(`http://localhost:8080/vaccineStatusUpdate/${id}`)
        .then((res)=>{
            if(res.data==="Status updated Successfully")
            {
                toast.success(res.data);
                getVaccine();
            }
            else
                toast.error(res.data);
        })
    }

  return (
    <div className='container'>
        <h4 className='text-light bg-success text-center'>Baby Vaccine Dashboard</h4>
        <div>
            <table className='table table-striped text-center table-hover'>
                <thead>
                    <tr>
                        <th>Baby Id</th>
                        <th>Baby Gender</th>
                        <th>Vaccine Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>                                                            
                </thead>
                <tbody>
                    {
                        getVaccineLst.map((item)=>{
                            return(
                                <tr>
                                    <td>{item.baby.babyid}</td>
                                    <td>{item.baby.gender}</td>
                                    <td>{item.vaccinename}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    {
                                        item.status=="Provided"
                                        ?
                                        (<td><input type='button' className='btn btn-success' value="Received" onClick={(e)=>(handleReceived(item.vid))} /></td>)
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
