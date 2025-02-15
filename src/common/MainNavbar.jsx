import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navbarList, navBarListRight } from '../data/MainNavbarData';
import './MainNavbar.css';

const MainNavbar = () => {
    const location = useLocation();
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to="/">ID+</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {
                            navbarList.map((navbarlink, index)=>(
                                //title is what appears when the mouse is over an element (it comes from html, I believe)
                                <li key={index} className="nav-item">
                                    <Link className={`nav-link ${location.pathname === navbarlink.url ? "active" : ""}`} title={navbarlink.title} to={navbarlink.url}>{navbarlink.option}</Link>
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="navbar-nav">
                        {
                            navBarListRight.map((navbarlink, index)=>(
                                <li key={index} className="nav-item">
                                    <Link className={`nav-link ${location.pathname === navbarlink.url ? "active" : ""}`} title={navbarlink.title} to={navbarlink.url}>
                                        <i className={navbarlink.icon}></i>
                                        {navbarlink.option}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainNavbar;