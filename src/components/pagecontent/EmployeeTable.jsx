import { useState } from 'react';
import '../Css/Table.css';
import axios from 'axios';

function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    const getEmployees = async (e) => {
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('token'));
        const headers = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await axios.get("/api/employees", headers);
            setEmployees(response.data);
            setError("Successfully fetched employees!");
        } catch (error) {
            setError('Failed to fetch employees, are you logged in?');
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h2>Employee List</h2>
            <button onClick={getEmployees}>Fetch Employees</button>
            {error && <p className="error">{error}</p>}
            {employees.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeeTable;
