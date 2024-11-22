import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Css/EmployeeForm.css';
import axios from "axios";

const AddEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        name: null,
        permissionId: null,
        password: null,
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({
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

            await axios.post(`/api/employees`, employeeData, headers);
            alert("Employee created successfully!");
        } catch (err) {
            console.error("Error creating Employee:", err);
            alert("Failed to create Employee.");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="type-container">
            <form onSubmit={handleSubmit} className="Employee-form">
                {/* Editable fields */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={employeeData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="permissionId">PermissionID:</label>
                    <input
                        type="text"
                        id="permissionId"
                        name="permissionId"
                        value={employeeData.permissionId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <div className="password-input">
                        <input
                            type={passwordVisible ? "text" : "password"} // Toggle between text and password
                            name="password"
                            id="password"
                            value={employeeData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash/> : <FaEye/>} {/* Show/hide eye icon */}
                        </span>
                    </div>
                </div>
                <button type="submit">Create Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
