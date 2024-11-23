import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/TableView.css";

const EmployeeTable = () => {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const [criteria, setCriteria] = useState({
        employeeId: null,
        employeeName: null,
        permissionDescription: null,
        certificationNames: null,
        lastJobStartDate: null,
        lastJobEndDate: null,
        sortBy: null,
        sortDirection: null,
        page: 0,
        size: 20,
    });

    const [searchFields, setSearchFields] = useState({
        employeeId: "",
        employeeName: "",
        permissionDescription: "",
        certificationNames: "",
        lastJobStartDate: "",
        lastJobEndDate: "",
    });

    useEffect(() => {
        fetchEmployees();
    }, [criteria]);

    const fetchEmployees = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.post("/api/employees/table", criteria, headers);
            const { content, totalElements, totalPages } = response.data;

            setData(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error fetching employees:", error);
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

    const handleEditEmployee = (employeeId) => {
        navigate(`/employee/edit/${employeeId}`);
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
                employeeId: searchFields.employeeId.trim() ? parseInt(searchFields.employeeId) : null,
                employeeName: searchFields.employeeName.trim() ? searchFields.employeeName : null,
                permissionDescription: searchFields.permissionDescription.trim()
                    ? searchFields.permissionDescription
                    : null,
                certificationNames: searchFields.certificationNames.trim()
                    ? searchFields.certificationNames
                    : null,
                lastJobStartDate: searchFields.lastJobStartDate.trim()
                    ? new Date(searchFields.lastJobStartDate).toISOString()
                    : null,
                lastJobEndDate: searchFields.lastJobEndDate.trim()
                    ? new Date(searchFields.lastJobEndDate).toISOString()
                    : null,
                page: 0,
            }));
        }
    };

    const handleReset = () => {
        setSearchFields({
            employeeId: "",
            employeeName: "",
            permissionDescription: "",
            certificationNames: "",
            lastJobStartDate: "",
            lastJobEndDate: "",
        });

        setCriteria((prev) => ({
            ...prev,
            employeeId: null,
            employeeName: null,
            permissionDescription: null,
            certificationNames: null,
            lastJobStartDate: null,
            lastJobEndDate: null,
            page: 0,
        }));
    };

    return (
        <div className="table-container">
            <div className="search-fields">
                <input
                    type="text"
                    name="employeeId"
                    placeholder="Search by ID"
                    value={searchFields.employeeId}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="employeeName"
                    placeholder="Search by Name"
                    value={searchFields.employeeName}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="permissionDescription"
                    placeholder="Search by Permission"
                    value={searchFields.permissionDescription}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="certificationNames"
                    placeholder="Search by Certifications"
                    value={searchFields.certificationNames}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <button onClick={handleReset} className="add-button">
                    Reset
                </button>
            </div>

            <div className="metadata">
                <button onClick={() => navigate("/employee/add")} className="add-button">
                    Add New Employee
                </button>
                <div className="metadata-info">
                    <p>Total Employees: {totalElements}</p>
                    <p>Total Pages: {totalPages}</p>
                    <p>Current Page: {currentPage + 1}</p>
                </div>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => handleSort("employeeId")}>ID</th>
                        <th onClick={() => handleSort("employeeName")}>Name</th>
                        <th onClick={() => handleSort("permissionDescription")}>Permission</th>
                        <th onClick={() => handleSort("certificationNames")}>Certifications</th>
                        <th onClick={() => handleSort("lastJobDate")}>Last Job Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>
                                <button
                                    className="link-button"
                                    onClick={() => handleEditEmployee(employee.employeeId)}
                                >
                                    {employee.employeeName}
                                </button>
                            </td>
                            <td>{employee.permissionDescription}</td>
                            <td>{employee.certificationNames}</td>
                            <td>
                                {employee.lastJobDate
                                    ? new Date(employee.lastJobDate).toLocaleDateString()
                                    : ""}
                            </td>
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

export default EmployeeTable;
