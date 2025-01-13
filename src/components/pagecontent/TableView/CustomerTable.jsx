import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/TableView.css";
import Pagination from "../../sharedlayout/Pagination.jsx";

const CustomerTable = () => {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const [criteria, setCriteria] = useState({
        customerName: null,
        address: null,
        cityCounty: null,
        zip: null,
        email: null,
        phoneNumber: null,
        vatNo: null,
        sortBy: null,
        sortDirection: "ASC",
        page: 0,
        size: 20,
    });

    useEffect(() => {
        fetchCustomers();
    }, [criteria]);

    const fetchCustomers = async () => {
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

            const url = `/api/customers/table?${queryParams.toString()}`;
            console.log("Fetching data from:", url);

            const response = await axios.get(url, headers);
            const { content, totalElements, totalPages } = response.data;

            setData(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error fetching customers:", error);
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
            customerName: null,
            address: null,
            cityCounty: null,
            zip: null,
            email: null,
            phoneNumber: null,
            vatNo: null,
            sortBy: null,
            sortDirection: "ASC",
            page: 0,
            size: 20,
        });
    };

    const handleEditCustomer = (customerId) => {
        navigate(`/customers/edit/${customerId}`);
    };

    const handlePageChange = (newPage) => {
        setCriteria((prev) => ({ ...prev, page: newPage }));
        setCurrentPage(newPage);
    };

    return (
        <div className="table-container">
            <div className="search-fields">
                <input type="text" name="customerName" placeholder="Search by Name" value={criteria.customerName || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="address" placeholder="Search by Address" value={criteria.address || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="cityCounty" placeholder="Search by City/County"
                       value={criteria.cityCounty || ""} onChange={handleSearchChange}/>
                <input type="text" name="zip" placeholder="Search by ZIP" value={criteria.zip || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="email" placeholder="Search by Email" value={criteria.email || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="phoneNumber" placeholder="Search by Phone" value={criteria.phoneNumber || ""}
                       onChange={handleSearchChange}/>
                <input type="text" name="vatNo" placeholder="Search by VAT No" value={criteria.vatNo || ""}
                       onChange={handleSearchChange}/>
                <button onClick={handleReset} className="add-button">Reset</button>
            </div>

            <div className="metadata">
                <button onClick={() => navigate("/customers/add")} className="add-button">Add New Customer</button>
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
                        <th onClick={() => handleSort("customerId")}>ID {criteria.sortBy === "customerId" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("customerName")}>Name {criteria.sortBy === "customerName" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("address")}>Address {criteria.sortBy === "address" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("cityCounty")}>City/County {criteria.sortBy === "cityCounty" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("zip")}>ZIP {criteria.sortBy === "zip" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("email")}>Email {criteria.sortBy === "email" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("phoneNumber")}>Phone {criteria.sortBy === "phoneNumber" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("vatNo")}>VAT
                            No {criteria.sortBy === "vatNo" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("lastOrderDate")}>Last Order
                            Date {criteria.sortBy === "lastOrderDate" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((customer) => (
                        <tr key={customer.customerId}>
                            <td>{customer.customerId}</td>
                            <td>
                                <button className="link-button"
                                        onClick={() => handleEditCustomer(customer.customerId)}>{customer.customerName}</button>
                            </td>
                            <td>{customer.address}</td>
                            <td>{customer.cityCounty}</td>
                            <td>{customer.zip}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.vatNo}</td>
                            <td>{customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : ""}</td>
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

export default CustomerTable;
