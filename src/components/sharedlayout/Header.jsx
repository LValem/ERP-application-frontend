import React, {useEffect, useRef, useState} from "react";
import MenuBar from './MenuBar';
import '../Css/Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className="header">
            <div className="header-content">
                <div id="container">
                    <input id="nav-input" type="checkbox" checked={isMenuOpen} readOnly/>
                    <label className="hamburger" htmlFor="nav-input" onClick={toggleMenu}>
                        <span></span>
                    </label>
                </div>
                <MenuBar isOpen={isMenuOpen} toggleMenu={toggleMenu} ref={menuRef}/>
                <a href="/" className="logo-link">
                    <img src="/src/assets/stekkor-logo-header.png" alt="Stekkor Transport Logo"
                         className="header-logo"/>
                </a>
            </div>
        </header>
    );
}

export default Header;
