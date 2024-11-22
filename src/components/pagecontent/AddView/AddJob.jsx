import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Css/EditView.css";

const AddJob = () => {
    const [jobData, setJobData] = useState({
        vehicleId: null,
        employeeId: null,
        orderId: null,
    });

    const [vehicles, setVehicles] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchVehicles();
        fetchEmployees();
        fetchOrders();
    }, []);

    const fetchVehicles = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get("/api/vehicles", headers);
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get("/api/employees", headers);
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get("/api/orders/without-job", headers);
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("Field:", name); // Should be "vehicleId"
        console.log("Value:", value); // Should be "vehicleId" (e.g., "1")
        setJobData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            await axios.post("/api/jobs", jobData, headers);
            alert("Job created successfully!");
            setJobData({
                vehicleId: null,
                employeeId: null,
                orderId: null,
            });
        } catch (error) {
            console.error("Error creating job:", error);
            alert("Failed to create job.");
        }
    };

    console.log(vehicles);
    return (
        <div className="type-container">
            <form onSubmit={handleSubmit} className="job-form">
                {/* Vehicle Dropdown */}
                <div>
                    <label htmlFor="vehicleId">Vehicle:</label>
                    <select
                        id="vehicleId"
                        name="vehicleId"
                        value={jobData.vehicleId || ""}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Select a vehicle
                        </option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                                {vehicle.registrationPlate}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Employee Dropdown */}
                <div>
                    <label htmlFor="employeeId">Employee:</label>
                    <select
                        id="employeeId"
                        name="employeeId"
                        value={jobData.employeeId || ""}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Select an employee
                        </option>
                        {employees.map((employee) => (
                            <option key={employee.employeeId} value={employee.employeeId}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Order Dropdown */}
                <div>
                    <label htmlFor="orderId">Order:</label>
                    <select
                        id="orderId"
                        name="orderId"
                        value={jobData.orderId || ""}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Select an order
                        </option>
                        {orders.map((order) => (
                            <option key={order.orderId} value={order.orderId}>
                                {`${order.orderId} - ${order.customerName}`}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Create Job</button>
            </form>
        </div>
    );
};

export default AddJob;
