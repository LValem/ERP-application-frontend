import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Css/TableView.css";

const DoneJobsTable = () => {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [criteria, setCriteria] = useState({
        jobId: null,
        vehicleId: null,
        registrationPlate: null,
        fuelUsedMin: null,
        fuelUsedMax: null,
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
        fuelUsedMin: "",
        fuelUsedMax: "",
        orderId: "",
        customerName: "",
        pickupDateStart: "",
        pickupDateEnd: "",
        dropOffDateStart: "",
        dropOffDateEnd: "",
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
                registrationPlate: searchFields.registrationPlate.trim() ? searchFields.registrationPlate : null,
                fuelUsedMin: searchFields.fuelUsedMin.trim() ? parseFloat(searchFields.fuelUsedMin) : null,
                fuelUsedMax: searchFields.fuelUsedMax.trim() ? parseFloat(searchFields.fuelUsedMax) : null,
                orderId: searchFields.orderId.trim() ? parseInt(searchFields.orderId, 10) : null,
                customerName: searchFields.customerName.trim() ? searchFields.customerName : null,
                pickupDateStart: searchFields.pickupDateStart || null,
                pickupDateEnd: searchFields.pickupDateEnd || null,
                dropOffDateStart: searchFields.dropOffDateStart || null,
                dropOffDateEnd: searchFields.dropOffDateEnd || null,
                page: 0,
            }));
        }
    };

    const handleReset = () => {
        setSearchFields({
            jobId: "",
            vehicleId: "",
            registrationPlate: "",
            fuelUsedMin: "",
            fuelUsedMax: "",
            orderId: "",
            customerName: "",
            pickupDateStart: "",
            pickupDateEnd: "",
            dropOffDateStart: "",
            dropOffDateEnd: "",
        });

        setCriteria((prev) => ({
            ...prev,
            jobId: null,
            vehicleId: null,
            registrationPlate: null,
            fuelUsedMin: null,
            fuelUsedMax: null,
            orderId: null,
            customerName: null,
            pickupDateStart: null,
            pickupDateEnd: null,
            dropOffDateStart: null,
            dropOffDateEnd: null,
            page: 0,
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
                    name="fuelUsedMin"
                    placeholder="Min Fuel Used"
                    value={searchFields.fuelUsedMin}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="fuelUsedMax"
                    placeholder="Max Fuel Used"
                    value={searchFields.fuelUsedMax}
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
