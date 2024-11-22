import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Css/TableView.css";
import { useNavigate } from "react-router-dom";

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
        sortDirection: null,
        page: 0,
        size: 20,
    });

    const [searchFields, setSearchFields] = useState({
        jobId: "",
        vehicleId: "",
        registrationPlate: "",
        orderId: "",
        customerName: "",
        pickupDateStart: "",
        pickupDateEnd: "",
        dropOffDateStart: "",
        dropOffDateEnd: "",
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

            const response = await axios.post("/api/jobs/not-done-table", criteria, headers);
            const { content, totalElements, totalPages } = response.data;

            setData(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error fetching not done jobs:", error);
        }
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const applySearchCriteria = (e) => {
        if (e.key === "Enter") {
            setCriteria((prev) => ({
                ...prev,
                jobId: searchFields.jobId.trim() ? parseInt(searchFields.jobId, 10) : null,
                vehicleId: searchFields.vehicleId.trim() ? parseInt(searchFields.vehicleId, 10) : null,
                registrationPlate: searchFields.registrationPlate.trim() || null,
                orderId: searchFields.orderId.trim() ? parseInt(searchFields.orderId, 10) : null,
                customerName: searchFields.customerName.trim() || null,
                pickupDateStart: searchFields.pickupDateStart || null,
                pickupDateEnd: searchFields.pickupDateEnd || null,
                dropOffDateStart: searchFields.dropOffDateStart || null,
                dropOffDateEnd: searchFields.dropOffDateEnd || null,
                page: 0, // Reset to the first page
            }));
        }
    };

    const handleReset = () => {
        setSearchFields({
            jobId: "",
            vehicleId: "",
            registrationPlate: "",
            orderId: "",
            customerName: "",
            pickupDateStart: "",
            pickupDateEnd: "",
            dropOffDateStart: "",
            dropOffDateEnd: "",
        });

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
            sortDirection: null,
            page: 0,
            size: 20,
        });
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
            {/* Search Fields */}
            <div className="search-fields">
                <input
                    type="number"
                    name="jobId"
                    placeholder="Search by Job ID"
                    value={searchFields.jobId}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="vehicleId"
                    placeholder="Search by Vehicle ID"
                    value={searchFields.vehicleId}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="registrationPlate"
                    placeholder="Search by Registration Plate"
                    value={searchFields.registrationPlate}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="orderId"
                    placeholder="Search by Order ID"
                    value={searchFields.orderId}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="customerName"
                    placeholder="Search by Customer Name"
                    value={searchFields.customerName}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <button onClick={handleReset} className="add-button">
                    Reset
                </button>
            </div>

            <div className="metadata">
                <button onClick={() => navigate("/jobs/add")} className="add-button">
                    Add New Job
                </button>
                <div className="metadata-info">
                    <p>Total Orders: {totalElements}</p>
                    <p>Total Pages: {totalPages}</p>
                    <p>Current Page: {currentPage + 1}</p>
                </div>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => handleSort("jobId")}>Job ID</th>
                        <th onClick={() => handleSort("vehicleId")}>Vehicle ID</th>
                        <th onClick={() => handleSort("registrationPlate")}>Registration Plate</th>
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

export default NotDoneJobsTable;
