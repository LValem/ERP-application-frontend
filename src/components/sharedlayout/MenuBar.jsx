// MenuBar.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Css/MenuBar.css';

function MenuBar({ isOpen, toggleMenu }) {

    const menuLinks = [
        { path: '/home', text: 'Homepage' },
        { path: '/employees', text: 'Employees' },
        { path: '/customers', text: 'Customers'},
        { path: '/orders', text: 'Orders'},
        { path: '/jobs/done', text: 'Completed jobs'},
        { path: '/jobs/not-done', text: 'Jobs in process'},
    ];

    return (
        <div className={`menu-bar ${isOpen ? 'open' : ''}`}>
            <div className="menu-links">
                {menuLinks.map((link, index) => (
                    <Link key={index} to={link.path} onClick={toggleMenu}>
                        {link.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MenuBar;
