import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Css/EmployeeForm.css';
import axios from 'axios';

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: null,
        permissionId: null,
        password: null,
    });
    const [error, setError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);


    useEffect(() => {
        const fetchEmployee = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            try {
                const response = await axios.get(`/api/employees/${id}`, headers);
                setEmployee({
                    name: response.data.name,
                    permissionId: response.data.permissionId,
                    password: '',
                });
            } catch (error) {
                alert('Failed to fetch employee data.');
                console.error('Error:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    // Submit the form and update the employee details
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('token'));
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const updatedEmployee = {
            name: employee.name,
            permissionId: employee.permissionId,
            password: employee.password,
        };

        try {
            await axios.put(`/api/employees/${id}`, updatedEmployee, headers); // PUT request to update employee
            alert('Employee updated successfully!');
            navigate('/employees'); // Redirect to the employee list after successful update
        } catch (error) {
            setError('Failed to update employee data.');
            console.error('Error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <h2>Edit Employee</h2>

            {/* Error alert */}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Permission ID:</label>
                    <input
                        type="text"
                        name="permissionId"
                        value={employee.permissionId}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <div className="password-input">
                        <input
                            type={passwordVisible ? "text" : "password"} // Toggle between text and password
                            name="password"
                            value={employee.password}
                            onChange={handleInputChange}
                            placeholder="Current password not shown!"
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash/> : <FaEye/>} {/* Show/hide eye icon */}
                        </span>
                    </div>
                </div>
                <div>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default EditEmployee;
