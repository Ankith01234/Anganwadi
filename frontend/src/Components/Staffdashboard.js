import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Staffdashboard() {

    function handleLogout()
    {
        sessionStorage.removeItem('staffid');
    }

  return (
    <div>
        <div>
            <nav className='navbar bg-success mb-4'>
                <a href="#" className='navbar-brand text-light'>Anganwadi Staff Dashboard</a>
                <ul className='nav'>
                    <li className='nav-item'>
                        <Link to="staffchild" className='nav-link text-light'>Children</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="staffwallet" className='nav-link text-light'>Wallet</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link text-light' onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </nav>            
        </div>
        <Outlet/>
    </div>
  )
}
