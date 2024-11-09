import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/sharedlayout/Header.jsx';
import Login from "./components/pagecontent/Login.jsx";
import EmployeeTable from "./components/pagecontent/EmployeeTable.jsx";
import './components/Css/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path="/employees" element={<EmployeeTable />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
