import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/sharedlayout/Header.jsx';
import Login from "./components/pagecontent/Login.jsx";
import EmployeeTable from "./components/pagecontent/EmployeeTable.jsx";
import Homepage from "./components/pagecontent/Homepage.jsx";

function MainApp() {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== '/' && <Header />}
            <main>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="/employees" element={<EmployeeTable />} />
                    <Route path="/home" element={<Homepage />} />
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <MainApp />
        </Router>
    );
}

export default App;
