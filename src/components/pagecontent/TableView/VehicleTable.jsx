import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Css/TableView.css";
import Pagination from "../../sharedlayout/Pagination.jsx";
import {useNavigate} from "react-router-dom";

const VehicleTable = () => {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const [criteria, setCriteria] = useState({
        vehicleId: null,
        vehicleType: null,
        registrationPlate: null,
        isInUse: null,
        minimumLoad: null,
        maximumLoad: null,
        minFuel: null,
        maxFuel: null,
        sortBy: null,
        sortDirection: "ASC",
        page: 0,
        size: 20,
    });

    useEffect(() => {
        fetchVehicles();
    }, [criteria]);

    const fetchVehicles = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const queryParams = new URLSearchParams();
            Object.keys(criteria).forEach((key) => {
                if (criteria[key] !== "" && criteria[key] !== null) {
                    queryParams.append(key, criteria[key]);
                }
            });

            const url = `/api/vehicles/table?${queryParams.toString()}`;
            console.log("Fetching data from:", url);

            const response = await axios.get(url, headers);
            const { content, totalElements, totalPages } = response.data;

            setData(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const handleSort = (field) => {
        setCriteria((prev) => ({
            ...prev,
            sortBy: field,
            sortDirection: prev.sortBy === field && prev.sortDirection === "ASC" ? "DESC" : "ASC",
        }));
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setCriteria((prev) => ({
            ...prev,
            [name]: value || "",
        }));
    };

    const handleReset = () => {
        setCriteria({
            vehicleId: null,
            vehicleType: null,
            registrationPlate: null,
            isInUse: null,
            minimumLoad: null,
            maximumLoad: null,
            minFuel: null,
            maxFuel: null,
            sortBy: null,
            sortDirection: "ASC",
            page: 0,
            size: 20,
        });
    };

    const handleEditVehicle = (vehicleId) => {
        navigate(`/vehicles/edit/${vehicleId}`);
    };

    const handlePageChange = (newPage) => {
        setCriteria((prev) => ({ ...prev, page: newPage }));
        setCurrentPage(newPage);
    };

    return (
        <div className="table-container">
            <div className="search-fields">
                <input type="number" name="vehicleId" placeholder="Search by vehicle ID"
                       value={criteria.vehicleId || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="vehicleType" placeholder="Search by Vehicle Type"
                       value={criteria.vehicleType || ""} onChange={handleSearchChange}/>
                <input type="text" name="registrationPlate" placeholder="Search by Registration Plate"
                       value={criteria.registrationPlate || ""} onChange={handleSearchChange}/>
                <input type="text" name="isInUse" placeholder="Search if vehicle is in use"
                       value={criteria.isInUse || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="minimumLoad" placeholder="Search by min Load"
                       value={criteria.minimumLoad || ""} onChange={handleSearchChange}/>
                <input type="number" name="maximumLoad" placeholder="Search by max Load"
                       value={criteria.maximumLoad || ""} onChange={handleSearchChange}/>
                <input type="number" name="minFuel" placeholder="Search by min Fuel"
                       value={criteria.minFuel || ""} onChange={handleSearchChange}/>
                <input type="number" name="maxFuel" placeholder="Search by max Fuel"
                       value={criteria.maxFuel || ""} onChange={handleSearchChange}/>
                <button onClick={handleReset} className="add-button">Reset</button>
            </div>

            <div className="metadata">
                <button onClick={() => navigate("/vehicles/add")} className="add-button">Add New Vehicle</button>
                <div className="metadata-info">
                    <p>Total Pages: {totalPages}</p>
                    <p>Current Page: {currentPage + 1}</p>
                    <p>
                        Showing
                        <input
                            type="number"
                            min="1"
                            max="500"
                            value={criteria.size || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || (Number(value) >= 1 && Number(value) <= 500)) {
                                    setCriteria((prev) => ({...prev, size: value}));
                                }
                            }}
                            onBlur={(e) => {
                                const value = Number(e.target.value);
                                if (isNaN(value) || value < 1 || value > 500) {
                                    setCriteria((prev) => ({...prev, size: 20})); // Always reset to 20 if invalid
                                } else {
                                    setCriteria((prev) => ({...prev, size: value, page: 0}));
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.target.blur(); // Apply the number when Enter is pressed
                            }}
                            style={{width: "60px", margin: "0 5px", textAlign: "center"}}
                        />
                        out of {totalElements}
                    </p>
                </div>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => handleSort("vehicleId")}>Vehicle ID
                            {criteria.sortBy === "vehicleId" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("vehicleType")}>vehicle type
                            {criteria.sortBy === "vehicleType" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("registrationPlate")}>Registration Plate
                            {criteria.sortBy === "registrationPlate" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("isInUse")}>is in use
                            {criteria.sortBy === "isInUse" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("maxLoad")}>max load
                            {criteria.sortBy === "maxLoad" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("currentFuel")}>current fuel
                            {criteria.sortBy === "currentFuel" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((vehicle) => (
                        <tr key={vehicle.vehicleId}>
                            <td>
                                <button className="link-button"
                                        onClick={() => handleEditVehicle(vehicle.vehicleId)}>
                                    {vehicle.vehicleId}
                                </button>
                            </td>
                            <td>{vehicle.vehicleType}</td>
                            <td>{vehicle.registrationPlate}</td>
                            <td>{vehicle.isInUse ? "Yes" : "No"}</td>
                            <td>{vehicle.maxLoad}</td>
                            <td>{vehicle.currentFuel}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default VehicleTable;
