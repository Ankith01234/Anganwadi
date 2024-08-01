import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Staffwallet() {

    const [amountdetails,setamountdetails]=useState([]);
    const [totalamount,settotalamount]=useState();
    const [foodItemLst,setfoodItemLst]=useState([]);

    const [foodname,setfoodname]=useState("");
    const [amount,setamount]=useState();

    useEffect(()=>{
        getAnganAmount();
        getTotalAmount();
        getFoodItems();
    },[]);

    function getTotalAmount()
    {
        var id=sessionStorage.getItem('staffid');

        axios.get(`http://localhost:8080/getTotalamount/${id}`)
        .then((res)=>{
            if(typeof res.data==='number')
                settotalamount(res.data);
            else
                toast.error(res.data);
        })

    }

    function getAnganAmount()
    {
        var id=sessionStorage.getItem('staffid');

        axios.get(`http://localhost:8080/getAmountDetailsFromGram/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setamountdetails(res.data);
            else
                toast.error(res.data);
        })

    }

    function handlsubmit()
    {
        if(!foodname)
        {
            toast.error("Please Enter the Foodname");
            return;
        }

        if(!amount)
        {
            toast.error("Please Enter the Amount");
            return;
        }

        var id=sessionStorage.getItem('staffid');

        axios.put(`http://localhost:8080/reduceBalance/${id}/${amount}`)
        .then((res)=>{
            if(res.data==="Anganwadi can buy the Expenditure")
            {
                const obj={foodname,amount};

                axios.post(`http://localhost:8080/addFood/${id}`,obj)
                .then((res)=>{
                    if(res.data==="FoodItem added Successfully")
                    {
                        toast.success(res.data);
                        getFoodItems();
                        getTotalAmount();
                        clearAll();
                    }
                    else
                        toast.error(res.data);
                })
            }
            else
                toast.error(res.data);
            
        })

    }

    function clearAll()
    {
        setamount("");
        setfoodname("");
    }

    function getFoodItems()
    {

        var id=sessionStorage.getItem('staffid');

        axios.get(`http://localhost:8080/getFoodItems/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setfoodItemLst(res.data);
            else
                toast.error(res.data);
        })

    }

  return (
    <div className='container'>
        <h4 className='text-light bg-success text-center mb-2'>Wallet Dashboard</h4>
        <div className='row'>
            <div className='col-6'>
                <h4 className='text-light bg-success text-center'>Expenditure Details</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Enter the Food Name</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setfoodname(e.target.value)} value={foodname} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the amount</label>
                            <input type='text' className='form-control border border-2 border-success' onChange={(e)=>setamount(e.target.value)} value={amount} />
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn btn-success' value="Submit" onClick={handlsubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <h4 className='text-light bg-success text-center'>Wallet Details</h4>
                <div className='card border border-2 border-success p-3'>
                    <div>
                        <table className='table table-striped text-center'>
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>                                
                                {
                                    amountdetails.map((item)=>{
                                        return(
                                            <tr>
                                                <td>{item.amount}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        )
                                    })
                                }                                
                            </tbody>
                        </table>
                    </div>
                    <div className='text-center'>
                        <p>Total Amount in Wallet :{totalamount}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-3'>
            <h4 className='text-center text-light bg-success'>Food Items List</h4>
            <div>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>Food Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foodItemLst.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item.foodname}</td>
                                        <td>{item.amount}</td>
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
