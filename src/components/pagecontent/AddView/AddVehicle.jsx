import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../Css/EditView.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddVehicle = () => {
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState({

        vehicleType: null,
        isInUse: null,
        maxLoad: null,
        currentFuel: null,
        registrationPlate: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Convert string value to boolean for isInUse field
        const processedValue = name === "isInUse" ? value === "true" : value;

        setVehicleData((prev) => ({
            ...prev,
            [name]: processedValue,
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

            await axios.post(`/api/vehicles`, vehicleData, headers);
            alert("Vehicle created successfully!");
            navigate('/vehicles')
        } catch (err) {
            console.error("Error creating Vehicle:", err);
            alert("Failed to create Vehicle.");
        }
    };

    return (
        <div className="type-container">
            <form onSubmit={handleSubmit} className="Vehicle-form">
                <div>
                    <label htmlFor="registrationPlate">Registration Plate:</label>
                    <input
                        type="text"
                        id="registrationPlate"
                        name="registrationPlate"
                        value={vehicleData.registrationPlate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vehicleType">Vehicle Type:</label>
                    <select
                        id="vehicleType"
                        name="vehicleType"
                        value={vehicleData.vehicleType}
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
                        value={vehicleData.isInUse}
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
                        value={vehicleData.maxLoad}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="currentFuel">Current Fuel:</label>
                    <input
                        type="number"
                        id="currentFuel"
                        name="currentFuel"
                        value={vehicleData.currentFuel}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Create Vehicle</button>
            </form>
        </div>
    );
};

export default AddVehicle;
