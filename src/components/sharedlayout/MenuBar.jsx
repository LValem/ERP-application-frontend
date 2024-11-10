// MenuBar.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Css/MenuBar.css';

function MenuBar({ isOpen, toggleMenu }) {

    const menuLinks = [
        { path: '/home', text: 'Avaleht' },
        { path: '/employees', text: 'Töötajad' },
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
