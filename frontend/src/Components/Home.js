import './Home.css';
import photo1 from '../photo1.jpeg';
import photo2 from '../photo2.jpeg';
import front1 from '../front1.jpeg';
import front2 from '../front2.jpg';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {

    const [id,setid]=useState();
    const [password,setpassword]=useState();

    const [val,setval]=useState();

    const navigate=useNavigate();

    function handleLogin()
    {        

        if(!val  || val==0)
        {
            toast.error("Please select the type");
            return;
        }

        if(!id)
        {
            toast.error("Please Enter ID");
            return;
        }

        if(!password)
        {
            toast.error("Please Enter Password");
            return;   
        }

        if(val==1)
        {
            const obj={id,password};
            axios.post("http://localhost:8080/chkAdminLogin",obj)
            .then((res)=>{
                if(res.data==="Login Successfully")
                {
                    toast.success(res.data);
                    navigate("/admin");
                } 
                else
                    toast.error(res.data);

            })
        }
        else if(val==2)
        {
            sessionStorage.setItem('gpid',id);
            const obj={id,password};
            axios.post("http://localhost:8080/chkGp",obj)
            .then((res)=>{
                if(res.data==="Correct Password")
                {
                    toast.success("Login Successfully");
                    navigate("/gpdashboard");                    
                }
                else
                    toast.error(res.data);
            })
        }
        else if(val==3)
        {
            const obj={id,password};

            sessionStorage.setItem('staffid',id);

            axios.post("http://localhost:8080/chkstaff",obj)
            .then((res)=>{
                if(res.data==="Teaching Entered Correct Password")
                {
                    toast.success(res.data);
                    navigate("/staffdashboard");
                }
                else if(res.data==="Care Taker Entered Correct Password")
                {
                    toast.success(res.data);
                    navigate("/caretakerdashboard");
                }
                else
                    toast.error(res.data);
            })

        }
        else if(val==4)
        {

            sessionStorage.setItem('womenid',id);

            axios.post(`http://localhost:8080/chkWomenId/${id}/${password}`)
            .then((res)=>{
                if(res.data==="Correct Password")
                {
                    navigate("/womendashboard");
                    toast.success(res.data);
                }
                else
                    toast.error(res.data);
            })

        }       
        
        clearAll();

    }

    function clearAll()
    {
        setval("");
        setid("");
        setpassword("");
    }

    return(
        <div>
            <h2 className="text-center mt-3 mb-3" style={{'background-color':'#198754','color':'white'}}>Anganwadi</h2>
            <div className="container">   
                <div className="row align-items-center">  
                    <div className="col-6">       
                        <div id="carouselExampleControls" class="carousel slide mb-4 border-3 border border-success" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={front1} class="d-block w-100" alt="" style={{'width':'300px','height':'500px'}} />
                                </div>
                                <div class="carousel-item">
                                    <img src={front2} class="d-block w-100" alt="" style={{'width':'300px','height':'500px'}} />
                                </div>                    
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <h4 className="text-center bg-success text-light">Login Credentials</h4>
                        </div>
                        <div className="card border border-2 border-success p-3">
                            <div>
                                <div>
                                    <label className="form-label">Select type</label>
                                    <select className='form-select border border-2 border-success' onChange={(e)=>setval(e.target.value)} value={val}> 
                                        <option value={0}>--Select--</option>
                                        <option value={1}>Admin</option>
                                        <option value={2}>Gram Panchayat</option>
                                        <option value={3}>Anganwadi Staff</option>
                                        <option value={4}>Women</option>
                                    </select>
                                </div>
                                <div className='mt-2'>
                                    <label className='form-label'>Enter the id</label>
                                    <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setid(e.target.value)} value={id} />
                                </div>
                                <div className='mt-2'>
                                    <label className="form-label">Enter the Password</label>
                                    <input type="password" className="form-control border border-2 border-success" onChange={(e)=>setpassword(e.target.value)} value={password} />
                                </div>
                                <div className="text-end mt-2">
                                    <Link className='me-2' to="forgot">Forgot Password</Link>
                                    <input type="button" className="btn btn-success" value="Login" onClick={handleLogin} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion mb-5">
                    <div className="accordion-item ">
                        <div className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#example" >
                                Click Here.... 
                            </button>
                        </div>
                        <div id="example" className="collapse accordion-collapse">
                            <div className="accordion-body text-center">
                                <div className="row align-items-center">
                                    <div className="col justify-content-center">
                                        <img src={photo1} alt="" className="me-3 img-fluid" style={{'width':'300px','height':'200px','border':'3px solid #198754'}} />
                                        <img src={photo2} alt="" className="img-fluid" style={{'width':'300px','height':'200px','border':'3px solid #198754'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="homepara">Anganwadi is a term used in India to describe rural child care centers. These centers are part of the Integrated Child Development Services (ICDS) program initiated by the Government of India in 1975. The primary aim of Anganwadi centers is to combat child hunger and malnutrition, as well as to provide basic health care and education to children under the age of six. They also serve as centers for providing nutrition education and supplementary nutrition to pregnant women and lactating mothers.Anganwadi centers play a vital role in improving maternal and child health, reducing malnutrition, and promoting early childhood education in rural and urban slum areas across India. They are an integral part of India's efforts to ensure holistic development and well-being for children and women from disadvantaged backgrounds.Anganwadi workers, who are often women from the local community, play a crucial role in delivering these services and are empowered through training and employment.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

