import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/sharedlayout/Header.jsx';
import Login from "./components/pagecontent/Login.jsx";
import Homepage from "./components/pagecontent/Homepage.jsx";
import EmployeeTable from "./components/pagecontent/EmployeeTable.jsx";
import EditEmployee from "./components/pagecontent/EditEmployee.jsx";
import ProtectedRoutes from "./components/security/ProtectedRoutes.jsx";
import AddEmployee from "./components/pagecontent/AddEmployee.jsx";

function MainApp() {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== '/' && <Header />}
            <main>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Login />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/home" element={<Homepage />} />
                        <Route path="/employees" element={<EmployeeTable />} />
                        <Route path="/employee/edit/:id" element={<EditEmployee />} />
                        <Route path="/employee/add" element={<AddEmployee />} />
                        {/* Add future protected routes here */}
                    </Route>
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
