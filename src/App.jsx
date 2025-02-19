import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/sharedlayout/Header.jsx';
import Login from "./components/pagecontent/Login.jsx";
import Homepage from "./components/pagecontent/Homepage.jsx";
import CustomerTable from "./components/pagecontent/TableView/CustomerTable.jsx";
import EditCustomer from "./components/pagecontent/EditView/EditCustomer.jsx";
import AddCustomer from "./components/pagecontent/AddView/AddCustomer.jsx";
import OrdersTable from "./components/pagecontent/TableView/OrdersTable.jsx";
import EditOrder from "./components/pagecontent/EditView/EditOrder.jsx";
import AddOrder from "./components/pagecontent/AddView/AddOrder.jsx";
import DoneJobsTable from "./components/pagecontent/TableView/DoneJobsTable.jsx";
import NotDoneJobsTable from "./components/pagecontent/TableView/NotDoneJobsTable.jsx";
import AddJob from "./components/pagecontent/AddView/AddJob.jsx";
import EmployeeTable from "./components/pagecontent/TableView/EmployeeTable.jsx";
import EditEmployee from "./components/pagecontent/EditView/EditEmployee.jsx";
import ProtectedRoutes from "./components/security/ProtectedRoutes.jsx";
import AddEmployee from "./components/pagecontent/AddView/AddEmployee.jsx";
import VehicleTable from "./components/pagecontent/TableView/VehicleTable.jsx";
import AddVehicle from "./components/pagecontent/AddView/AddVehicle.jsx";
import EditVehicle from "./components/pagecontent/EditView/EditVehicle.jsx";
import AddFeedback from "./components/pagecontent/AddView/AddFeedback.jsx";

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
                        <Route path="/customers" element={<CustomerTable />} />
                        <Route path="/customers/edit/:customerId" element={<EditCustomer />} />
                        <Route path="/customers/add" element={<AddCustomer />} />
                        <Route path="/orders" element={<OrdersTable />} />
                        <Route path="/orders/edit/:orderId" element={<EditOrder />} />
                        <Route path="/orders/add" element={<AddOrder />} />
                        <Route path="/jobs/done" element={<DoneJobsTable />} />
                        <Route path="/jobs/not-done" element={<NotDoneJobsTable />} />
                        <Route path="/jobs/add" element={<AddJob />} />
                        <Route path="/vehicles" element={<VehicleTable />} />
                        <Route path="/vehicles/add" element={<AddVehicle />} />
                        <Route path="/vehicles/edit/:id" element={<EditVehicle />} />
                        <Route path="/feedback" element={<AddFeedback />} />
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
