import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Womendashboard() {

    function handleLogout()
    {
        sessionStorage.removeItem('womenid');
    }

  return (
    <div>
        <nav className='navbar bg-success mb-4'>
            <a href="#" className='navbar-brand text-light'>Women Dashboard</a>
            <ul className='nav'>
                <li className='nav-item'>
                    <Link to="womennutrition" className='nav-link text-light'>Nutrition</Link>
                </li>
                <li className='nav-item'>
                    <Link to="womenbabyvaccine" className='nav-link text-light'>Vaccine</Link>
                </li>
                <li className='nav-item'>
                    <Link to="womenpostfeedback" className='nav-link text-light'>Post Feedback</Link>
                </li>
                <li className='nav-item'>
                    <Link to="womencomplaint" className='nav-link text-light'>Post Complaints</Link>
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
