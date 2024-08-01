import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Caretakerdashboard() {

    function handleLogout()
    {
        sessionStorage.removeItem('staffid');
    }

  return (
    <div>
        <nav className='navbar bg-success mb-4'>
            <a href='#' className='navbar-brand text-light'>Angan CareTaker Dashboard</a>
            <ul className='nav'>
                <li className='nav-item'>
                    <Link to="caretakerwomen" className='nav-link text-light'>Add Women</Link>            
                </li>
                <li className='nav-item'>
                    <Link to="provideNutrition" className='nav-link text-light'>Provide Nutrition</Link>
                </li>
                <li className='nav-item'>
                    <Link to="caretakerbaby" className='nav-link text-light'>Add Baby</Link>
                </li>
                <li className='nav-item'>
                    <Link to="caretakerbabyvaccine" className='nav-link text-light'>Provide Vaccine</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/" onClick={handleLogout} className='nav-link text-light'>Logout</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </div>
  )
}
