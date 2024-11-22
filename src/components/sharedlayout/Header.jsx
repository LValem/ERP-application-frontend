import React, {useEffect, useRef, useState} from "react";
import MenuBar from './MenuBar';
import '../Css/Header.css';
import {useLocation, useParams} from "react-router-dom";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();
    const params = useParams();

    const headerTitles = {
        "/home": "Homepage",
        "/employees": "Employees",
        "/customers": "Customers",
        "/customers/add": "Create a new customer",
        "/customers/edit/:CustomerId": "Edit Customer",
        "/orders": "Orders",
        "/orders/add": "Create a new order",
        "/orders/edit/:orderId": "Edit Order",
        "/jobs/done": "Completed jobs",
        "/jobs/not-done": "Jobs in process",
        "/jobs/add": "Create a new job",
        "/employee/edit/:id": "Edit Employee",
        "/employee/add" : "Create a new Employee"
    };

    // Should include id as well, like "Edit Order 4" but doesn't
    const getCurrentTitle = (path, params) => {
        for (const key in headerTitles) {
            // Create a regex to match dynamic routes like ":orderId"
            const regex = new RegExp(`^${key.replace(/:\w+/g, "\\w+")}$`);

            if (regex.test(path)) {
                return headerTitles[key].replace(/\{\w+\}/g, (match) => {
                    const paramKey = match.slice(1, -1);
                    return params[paramKey] || match;
                });
            }
        }
        return "";
    };

    const currentTitle = getCurrentTitle(location.pathname, params);

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
                <div className="header-title">
                    <h1>{currentTitle}</h1>
                </div>
                <a href="/home" className="logo-link">
                    <img src="/src/assets/stekkor-logo-header-fix.png" alt="Stekkor Transport Logo"
                         className="header-logo"/>
                </a>
            </div>
        </header>
    );
}

export default Header;
