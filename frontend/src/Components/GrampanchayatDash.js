import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function GrampanchayatDash() {

    function handleLogout()
    {
        sessionStorage.removeItem('gpid');
    }

  return (
    <div>
        <nav className='navbar navbar-success bg-success mb-4 mt-2'>
            <a className='navbar-brand text-light'>Gram Panchayat Dashboard</a>
            <ul className='nav'>
                <li className='nav-item'>
                    <Link to="gpnganwadi" className='nav-link text-light'>Anganwadi</Link>
                </li>
                <li className='nav-item'>
                    <Link to="gpstaff" className='nav-link text-light'>Staff</Link>
                </li>
                <li className='nav-item'>
                    <Link to="gpanganwallet" className='nav-link text-light'>Wallet</Link>
                </li>
                <li className='nav-item'>
                    <Link to="transactiondetails" className='nav-link text-light'>Transaction Details</Link>
                </li>
                <li className='nav-item'>
                    <Link to="nutritiondetails" className='nav-link text-light'>Nutrition Details</Link>
                </li>
                <li className='nav-item'>
                    <Link to="vaccinedetails" className='nav-link text-light'>Vaccine Details</Link>
                </li>
                <li className='nav-item'>
                    <Link to="viewfeedback" className='nav-link text-light'>View Feedback</Link>
                </li>
                <li className='nav-item'>
                    <Link to="viewcomplaint" className='nav-link text-light'>View Complaints</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/" className='nav-link text-light' onClick={handleLogout}>Logout</Link>
                </li>
            </ul>        
        </nav>
        <Outlet/>
    </div>
  )
}
