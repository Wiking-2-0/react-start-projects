import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigations({pages}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                {
                    pages.map(({ name, url }) => (
                        <li key={name} className='nav-item'>
                            <NavLink className='nav-link' to={url} end={true}>{name}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navigations
