import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Caretakerbaby() {

    useEffect(() => {
        getWomens();
        //getBaby();     
    }, [])

    const [womenLst, setwomenLst] = useState([]);
    const [babylst, setbabylst] = useState([]);

    const [womenid, setwomenid] = useState();
    const [gender, setgender] = useState("");
    const [months, setmonths] = useState("");

    const [getwomendetails, setgetwomendetails] = useState();

    function getBaby(wid) {

        axios.get(`http://localhost:8080/getBabyBasedOnWomen/${wid}`)
            .then((res) => {
                if (typeof res.data === 'object') {
                    setbabylst(res.data);
                }
                else
                    toast.error(res.data);
            })
    }

    function getWomens() {
        var id = sessionStorage.getItem('staffid');

        axios.get(`http://localhost:8080/getWomens/${id}`)
            .then((res) => {
                if (typeof res.data === 'object')
                    setwomenLst(res.data);
                else
                    toast.error(res.data);
            })
    }

    function handleSubmit() {
        if (!womenid || womenid == 0) {
            toast.error("Please select the women");
            return;
        }

        if (!gender) {
            toast.error("Please Enter the gender");
            return;
        }

        if (!months) {
            toast.error("Please Enter the months");
            return;
        }

        const obj = { gender, months };

        axios.post(`http://localhost:8080/addBaby/${womenid}`, obj)
            .then((res) => {
                if (res.data === "Baby Added Successfully") {
                    toast.success(res.data);
                    clearAll();
                }
                else
                    toast.error(res.data);
            })

    }

    function clearAll() {
        setwomenid("");
        setgender("");
        setmonths("");
    }

    function setId(e) {
        setgetwomendetails(e.target.value);
        getBaby(e.target.value);
    }

    return (
        <div className='container'>
            <h4 className='text-light text-center bg-success'>Baby Dashboard</h4>
            <div className='row'>
                <div className='col-6'>
                    <div className='card border border-2 border-success p-3'>
                        <div>
                            <div>
                                <label className='form-label'>Select the Women</label>
                                <select className='form-select border border-2 border-success' onChange={(e) => setwomenid(e.target.value)} value={womenid}>
                                    <option value={0}>--Select--</option>
                                    {
                                        womenLst.map((item) => {
                                            return (
                                                <option value={item.womenid}>{item.womenname}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Enter the Gender</label>
                                <input type='text' className='form-control border border-2 border-success' onChange={(e) => setgender(e.target.value)} value={gender} />
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Enter the Months</label>
                                <input type='text' className='form-control border border-2 border-success' onChange={(e) => setmonths(e.target.value)} value={months} />
                            </div>
                            <div className='mt-2 text-end'>
                                <input type='button' className='btn btn-success' value="Submit" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='card border border-2 border-success p-3'>
                        <div>
                            <div>
                                <label className='form-label'>Select the Women</label>
                                <select className='form-select border border-2 border-success' onChange={setId} value={getwomendetails}>
                                    <option value={0}>--Select--</option>
                                    {
                                        womenLst.map((item) => {
                                            return (
                                                <option value={item.womenid}>{item.womenname}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className='text-light text-center bg-success mt-3'>Baby Details</h4>
                    {
                        <table className='table table-striped text-center'>
                            <thead>
                                <tr>
                                    <th>Gender</th>
                                    <th>Months</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    babylst.length == 0
                                        ?
                                        (
                                            ""// <h5>This Lady Haven't given birth to baby</h5>
                                        )
                                        : (
                                            babylst.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>{item.gender}</td>
                                                        <td>{item.months}</td>
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
