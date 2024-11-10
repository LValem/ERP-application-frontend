import React from "react";
import '../Css/Header.css'; // Ensure to create and import this CSS file

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">TUUMA SALADUSED</h1>
                <nav className="header-nav">
                    <a href="/" className="nav-link">HOME</a>
                    <a href="/employees" className="nav-link">EMPLOYEES</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
