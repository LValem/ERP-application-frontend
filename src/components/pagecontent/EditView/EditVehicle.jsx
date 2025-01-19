import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../Css/EditView.css';
import axios from 'axios';

function EditVehicle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        vehicleId: null,
        vehicleType: null,
        registrationPlate: null,
        isInUse: null,
        currentFuel: null,
        maxLoad: null
    });
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchVehicle = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            try {
                const response = await axios.get(`/api/vehicles/${id}`, headers);
                setVehicle(response.data);
            } catch (error) {
                alert('Failed to fetch vehicle data.');
                console.error('Error:', error);
            }
        };

        fetchVehicle();
    }, [id]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicle((prevVehicle) => ({
            ...prevVehicle,
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

        const updatedVehicle = {
            vehicleType: vehicle.vehicleType,
            registrationPlate: vehicle.registrationPlate,
            isInUse: vehicle.isInUse,
            currentFuel: vehicle.currentFuel,
            maxLoad: vehicle.maxLoad
        };

        try {
            await axios.put(`/api/vehicles/${id}`, updatedVehicle, headers); // PUT request to update employee
            alert('Vehicle updated successfully!');
            navigate('/vehicles'); // Redirect to the employee list after successful update
        } catch (error) {
            setError('Failed to update vehicle data.');
            console.error('Error:', error);
        }
    };
    return (
        <div className="type-container">
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit} className="order-form">
                {/* Non-editable Vehicle ID field */}
                <div>
                    <label htmlFor="vehicleId">Vehicle ID:</label>
                    <input
                        type="text"
                        id="vehicleId"
                        name="vehicleId"
                        value={vehicle.vehicleId || ""}
                        disabled
                    />
                </div>

                <div>
                    <label htmlFor="registrationPlate">Registration Plate:</label>
                    <input
                        type="text"
                        id="registrationPlate"
                        name="registrationPlate"
                        value={vehicle.registrationPlate || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="vehicleType">Vehicle Type:</label>
                    <select
                        id="vehicleType"
                        name="vehicleType"
                        value={vehicle.vehicleType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="isInUse">Is In Use:</label>
                    <select
                        id="isInUse"
                        name="isInUse"
                        value={vehicle.isInUse}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="maxLoad">Max Load:</label>
                    <input
                        type="number"
                        id="maxLoad"
                        name="maxLoad"
                        value={vehicle.maxLoad || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="currentFuel">Current Fuel:</label>
                    <input
                        type="number"
                        id="currentFuel"
                        name="currentFuel"
                        value={vehicle.currentFuel || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditVehicle;
