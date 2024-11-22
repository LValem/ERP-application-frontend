import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Table.css';
import axios from 'axios';

function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            try {
                const response = await axios.get('/api/employees', headers);
                setEmployees(response.data);
                setError(null);
            } catch (error) {
                setError('Failed to fetch employees, are you logged in?');
                console.error('Error:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleEdit = (employeeId) => {
        // Navigate to the EditEmployee page with the employee's ID
        navigate(`/employee/edit/${employeeId}`);
    };

    const handleCreate = () => {
        // Navigate to the Create New Employee page
        navigate('/employee/add');
    };

    return (
        <div className="App">
            <h2>Employee List</h2>
            {/* Create New Employee Button */}
            <button className="create-employee-button" onClick={handleCreate}>
                Create New Employee
            </button>

            {error && <p className="error">{error}</p>}
            {employees.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>PermissionID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>
                                <button
                                    className="link-button"
                                    onClick={() => handleEdit(employee.employeeId)}
                                >
                                    {employee.employeeId}
                                </button>
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.permissionId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No employees available.</p>
            )}
        </div>
    );
}

export default EmployeeTable;
