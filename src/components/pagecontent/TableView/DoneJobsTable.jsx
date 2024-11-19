import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Css/TableView.css";

const DoneJobsTable = () => {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [criteria, setCriteria] = useState({
        sortBy: null,
        sortDirection: null,
        page: 0,
        size: 20,
    });

    useEffect(() => {
        fetchDoneJobs();
    }, [criteria]);

    const fetchDoneJobs = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.post("/api/jobs/done-table", criteria, headers);
            const { content, totalElements, totalPages } = response.data;

            setData(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error fetching done jobs:", error);
        }
    };

    const handleSort = (field) => {
        setCriteria((prev) => ({
            ...prev,
            sortBy: field,
            sortDirection: prev.sortBy === field && prev.sortDirection === "ASC" ? "DESC" : "ASC",
        }));
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCriteria((prev) => ({ ...prev, page }));
            setCurrentPage(page);
        }
    };

    return (
        <div className="table-container">
            <div className="metadata">
                <p>Total Done Jobs: {totalElements}</p>
                <p>Total Pages: {totalPages}</p>
                <p>Current Page: {currentPage + 1}</p>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => handleSort("jobId")}>Job ID</th>
                        <th onClick={() => handleSort("vehicleId")}>Vehicle ID</th>
                        <th onClick={() => handleSort("registrationPlate")}>Registration Plate</th>
                        <th onClick={() => handleSort("fuelUsed")}>Fuel Used (liters)</th>
                        <th onClick={() => handleSort("distanceDriven")}>Distance Driven (km)</th>
                        <th onClick={() => handleSort("orderId")}>Order ID</th>
                        <th onClick={() => handleSort("customerName")}>Customer Name</th>
                        <th onClick={() => handleSort("pickupDate")}>Pickup Date</th>
                        <th onClick={() => handleSort("dropOffDate")}>Drop-Off Date</th>
                        <th onClick={() => handleSort("isComplete")}>Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((job) => (
                        <tr key={job.jobId}>
                            <td>{job.jobId}</td>
                            <td>{job.vehicleId}</td>
                            <td>{job.registrationPlate}</td>
                            <td>{job.fuelUsed}</td>
                            <td>{job.distanceDriven}</td>
                            <td>{job.orderId}</td>
                            <td>{job.customerName}</td>
                            <td>{job.pickupDate ? new Date(job.pickupDate).toLocaleString() : ""}</td>
                            <td>{job.dropOffDate ? new Date(job.dropOffDate).toLocaleString() : ""}</td>
                            <td>{job.complete ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage + 1 >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DoneJobsTable;
