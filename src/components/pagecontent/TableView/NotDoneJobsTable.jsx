import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Css/TableView.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../sharedlayout/Pagination.jsx";

const NotDoneJobsTable = () => {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const [criteria, setCriteria] = useState({
        jobId: null,
        vehicleId: null,
        registrationPlate: null,
        orderId: null,
        customerName: null,
        pickupDateStart: null,
        pickupDateEnd: null,
        dropOffDateStart: null,
        dropOffDateEnd: null,
        sortBy: null,
        sortDirection: "ASC",
        page: 0,
        size: 20,
    });

    useEffect(() => {
        fetchNotDoneJobs();
    }, [criteria]);

    const fetchNotDoneJobs = async () => {
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
                if (criteria[key] !== null && criteria[key] !== "") {
                    queryParams.append(key, criteria[key]);
                }
            });

            const url = `/api/jobs/not-done-table?${queryParams.toString()}`;
            console.log("Fetching data from:", url);

            const response = await axios.get(url, headers);
            const { content, totalElements, totalPages } = response.data;

            setData(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error fetching not done jobs:", error);
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
        setCriteria((prev) => ({ ...prev, [name]: value || null }));
    };

    const handleReset = () => {
        setCriteria({
            jobId: null,
            vehicleId: null,
            registrationPlate: null,
            orderId: null,
            customerName: null,
            pickupDateStart: null,
            pickupDateEnd: null,
            dropOffDateStart: null,
            dropOffDateEnd: null,
            sortBy: null,
            sortDirection: "ASC",
            page: 0,
            size: 20,
        });
    };

    const handlePageChange = (newPage) => {
        setCriteria((prev) => ({ ...prev, page: newPage }));
        setCurrentPage(newPage);
    };

    return (
        <div className="table-container">
            <div className="search-fields">
                <input type="number" name="jobId" placeholder="Search by Job ID" value={criteria.jobId || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="vehicleId" placeholder="Search by Vehicle ID"
                       value={criteria.vehicleId || ""} onChange={handleSearchChange}/>
                <input type="text" name="registrationPlate" placeholder="Search by Registration Plate"
                       value={criteria.registrationPlate || ""} onChange={handleSearchChange}/>
                <input type="number" name="orderId" placeholder="Search by Order ID" value={criteria.orderId || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="customerName" placeholder="Search by Customer Name"
                       value={criteria.customerName || ""} onChange={handleSearchChange}/>
                <button onClick={handleReset} className="add-button">Reset</button>
            </div>

            <div className="metadata">
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
                        <th onClick={() => handleSort("jobId")}>Job
                            ID {criteria.sortBy === "jobId" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("vehicleId")}>Vehicle
                            ID {criteria.sortBy === "vehicleId" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("registrationPlate")}>Registration
                            Plate {criteria.sortBy === "registrationPlate" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("orderId")}>Order
                            ID {criteria.sortBy === "orderId" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("customerName")}>Customer
                            Name {criteria.sortBy === "customerName" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("pickupDate")}>Pickup
                            Date {criteria.sortBy === "pickupDate" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("dropOffDate")}>Drop-Off
                            Date {criteria.sortBy === "dropOffDate" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("isComplete")}>Completed {criteria.sortBy === "isComplete" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((job) => (
                        <tr key={job.jobId}>
                            <td>{job.jobId}</td>
                            <td>{job.vehicleId}</td>
                            <td>{job.registrationPlate}</td>
                            <td>{job.orderId}</td>
                            <td>{job.customerName}</td>
                            <td>{job.pickupDate ? new Date(job.pickupDate).toLocaleString() : ""}</td>
                            <td>{job.dropOffDate ? new Date(job.dropOffDate).toLocaleString() : ""}</td>
                            <td>{job.isComplete ? "Yes" : "No"}</td>
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

export default NotDoneJobsTable;
