import React from 'react'
import { Link,Outlet, useNavigate } from 'react-router-dom'

export default function Admin() {

  return (
    <div>
        <nav className='navbar navbar-success bg-success mb-4 mt-2'>
            <a href="#" className='navbar-brand text-light'>Admin Dashboard</a>
            <ul className='nav'>
                <li className='nav-item'>
                    <Link to="admindistrict" className='nav-link text-light'>District</Link>
                </li>
                <li className='nav-item'>
                    <Link to="admintaluk" className='nav-link text-light'>Taluk</Link>
                </li>
                <li className='nav-item'>
                    <Link to="admingp" className='nav-link text-light'>Gram Panchayat</Link>
                </li>
                <li className='nav-item'>
                    <Link to="adminvillage" className='nav-link text-light'>Village</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/" className='nav-link text-light'>Logout</Link>
                </li>
            </ul>
        </nav>   
        <Outlet/>             
    </div>
  )
}
