import React, { useEffect, useState } from 'react';
import anganstaff from '../anganstaff.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Gpanganstaff() {

    const [aid,setaid]=useState();
    const [staffname,setstaffname]=useState("");
    const [staffemail,setstaffemail]=useState("");
    const [staffphone,setstaffphone]=useState("");
    const [staffaddress,setstaffaddress]=useState("");
    const [staffid,setstaffid]=useState();
    const [stafftype,setstafftype]=useState("");

    const [anganlst,setanganlst]=useState([]);
    const [stafflst,setstafflst]=useState([]);
    const [staffdetails,setstaffdetails]=useState({});

    useEffect(()=>{
        getAngan();
        getStaff();
    },[])

    function getStaff()
    {
        var id=sessionStorage.getItem('gpid');
        axios.get(`http://localhost:8080/getParticularStaff/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setstafflst(res.data);
            else
                toast.error(res.data);
        })
    }

    function getAngan()
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
        if(!staffname)
        {
            toast.error("Please Enter the staff name");
            return;   
        }
        if(!staffemail)
        {
            toast.error("Please Enter the staff email");
            return;
        }
        if(!staffphone)
        {
            toast.error("Please Enter the staff phone");
            return;
        }
        if(!staffaddress)
        {
            toast.error("Please Enter the staff address");
            return;
        }
        if(!stafftype)
        {
            toast.error("Please Select the staff type");
            return;
        }

        const obj={staffname,staffemail,staffphone,staffaddress,stafftype};

        axios.post(`http://localhost:8080/addStaff/${aid}`,obj)
        .then((res)=>{
            if(res.data==="Staff Added successfully")
            {
                toast.success(res.data);   
                getStaff();
            }
            else
                toast.error(res.data);
        })

        clearAll();

    }

    function clearAll()
    {
        setaid("");
        setstaffname("");
        setstaffemail("");
        setstaffphone("");
        setstaffaddress("");
        setstafftype("");
    }

    function handleGet()
    {

        if(!aid || aid==0)
        {
            toast.error("Please Select the Anganwadi");
            return;
        }

        if(!staffid || staffid==0)
        {
            toast.error("Please Select the Angawadi Staff");
            return;
        }

        axios.get(`http://localhost:8080/getStaffDetails/${staffid}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setstaffdetails(res.data);
            else
                toast.error(res.data);
        })
    }

  return (
    <div className='container'>
        <h4 className='bg-success text-center text-light'>Staff Dasboard</h4>
        <div className='row mt-2 align-items-center'>
            <div className='col-6'>
                <img src={anganstaff} className='img-fluid' alt="" style={{'width':'550px','height':'400px','border':'2px solid #198754'}} />
            </div>
            <div className='col-6'>
                <h4 className='bg-success text-center text-light'>New Staff</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Select the Anganwadi</label>
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
                            <label className='form-label'>Enter the Anganwadi Staff</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setstaffname(e.target.value)} value={staffname}/>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Select the Anganwadi Staff Type</label>
                            <select className='form-select border border-2 border-success' onChange={(e)=>setstafftype(e.target.value)} value={stafftype}>
                                <option value={"select"}>--Select--</option>
                                <option value={"Teaching"}>Teaching</option>
                                <option value={"Care Taker"}>Care Taker</option>
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Staff E-mail</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setstaffemail(e.target.value)} value={staffemail} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Staff Phone</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setstaffphone(e.target.value)} value={staffphone} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Staff Address</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setstaffaddress(e.target.value)} value={staffaddress} />
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-3'>
            <h4 className='bg-success text-center text-light'>Staff Details</h4>
            <div className='row mb-5 align-items-center'>
                <div className='col-4'>
                    <div className='card border border-2 border-success p-3'>
                        <div>
                            <label className='form-label'>Select the Anganwadi</label>
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
                            <label className='form-label'>Select the Staff</label>
                            <select className='form-select border border-2 border-success' onChange={(e)=>setstaffid(e.target.value)} value={staffid}>
                                <option value={0}>--Select--</option>
                                {                                    
                                    stafflst.filter(staff=>staff.anganwadi.aid==aid).map((staff)=>{
                                        return(
                                            <option value={staff.id}>{staff.staffname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='text-end mt-2'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handleGet} />
                        </div>
                    </div>
                </div>
                <div className='col-8'>
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>
                                <th>Staff Name</th>
                                <th>Staff Email-Id</th>
                                <th>Staff Type</th>
                                <th>Staff Phone Number</th>
                                <th>Staff Address</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {                                
                                <tr>
                                    <td>{staffdetails.staffname}</td>
                                    <td>{staffdetails.staffemail}</td>
                                    <td>{staffdetails.stafftype}</td>
                                    <td>{staffdetails.staffphone}</td>
                                    <td>{staffdetails.staffaddress}</td>                                             
                                </tr>                                 
                            }
                        </tbody>
                    </table>
                </div>
            </div>            
        </div>
    </div>
  )
}
