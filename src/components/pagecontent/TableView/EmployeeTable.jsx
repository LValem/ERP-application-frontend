import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/TableView.css";
import Pagination from "../../sharedlayout/Pagination.jsx";

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
        sortBy: null,
        sortDirection: "ASC",
        page: 0,
        size: 20,
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

            const queryParams = new URLSearchParams();
            Object.keys(criteria).forEach((key) => {
                if (criteria[key] !== "" && criteria[key] !== null) {
                    queryParams.append(key, criteria[key]);
                }
            });

            const url = `/api/employees/table?${queryParams.toString()}`;
            console.log("Fetching data from:", url);

            const response = await axios.get(url, headers);
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

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setCriteria((prev) => ({
            ...prev,
            [name]: value || "",
        }));
    };

    const handleReset = () => {
        setCriteria({
            employeeId: null,
            employeeName: null,
            permissionDescription: null,
            certificationNames: null,
            sortBy: null,
            sortDirection: "ASC",
            page: 0,
            size: 20,
        });
    };

    const handleEditEmployee = (employeeId) => {
        navigate(`/employee/edit/${employeeId}`);
    };

    const handlePageChange = (newPage) => {
        setCriteria((prev) => ({ ...prev, page: newPage }));
        setCurrentPage(newPage);
    };

    return (
        <div className="table-container">
            <div className="search-fields">
                <input type="text" name="employeeId" placeholder="Search by ID" value={criteria.employeeId || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="employeeName" placeholder="Search by Name" value={criteria.employeeName || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="permissionDescription" placeholder="Search by Permission"
                       value={criteria.permissionDescription || ""} onChange={handleSearchChange}/>
                <input type="text" name="certificationNames" placeholder="Search by Certifications"
                       value={criteria.certificationNames || ""} onChange={handleSearchChange}/>
                <button onClick={handleReset} className="add-button">Reset</button>
            </div>

            <div className="metadata">
                <button onClick={() => navigate("/employee/add")} className="add-button">Add New Employee</button>
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
                        <th onClick={() => handleSort("employeeId")}>ID {criteria.sortBy === "employeeId" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("employeeName")}>Name {criteria.sortBy === "employeeName" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("permissionDescription")}>Permission {criteria.sortBy === "permissionDescription" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("certificationNames")}>Certifications {criteria.sortBy === "certificationNames" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("lastJobDate")}>Last Job
                            Date {criteria.sortBy === "lastJobDate" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>
                                <button className="link-button"
                                        onClick={() => handleEditEmployee(employee.employeeId)}>{employee.employeeName}</button>
                            </td>
                            <td>{employee.permissionDescription}</td>
                            <td>{employee.certificationNames}</td>
                            <td>{employee.lastJobDate ? new Date(employee.lastJobDate).toLocaleDateString() : ""}</td>
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

export default EmployeeTable;
