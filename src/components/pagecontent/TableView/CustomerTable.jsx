import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation to the edit page
import "../../Css/TableView.css";

const CustomerTable = () => {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate(); // React Router navigation hook

    const [criteria, setCriteria] = useState({
        customerName: null,
        address: null,
        cityCounty: null,
        zip: null,
        email: null,
        phoneNumber: null,
        vatNo: null,
        sortBy: null,
        sortDirection: null,
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

            const response = await axios.post("/api/customers/table", criteria, headers);
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

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCriteria((prev) => ({ ...prev, page }));
            setCurrentPage(page);
        }
    };

    const handleEditCustomer = (customerId) => {
        navigate(`/customers/edit/${customerId}`); // Navigate to edit page with customerId
    };

    return (
        <div className="table-container">
            <div className="metadata">
                <p>Total Customers: {totalElements}</p>
                <p>Total Pages: {totalPages}</p>
                <p>Current Page: {currentPage + 1}</p>
                <button onClick={() => navigate("/customers/add")} className="add-button">
                    Add New Customer
                </button>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                    <th onClick={() => handleSort("customerId")}>ID</th>
                        <th onClick={() => handleSort("customerName")}>Name</th>
                        <th onClick={() => handleSort("address")}>Address</th>
                        <th onClick={() => handleSort("cityCounty")}>City/County</th>
                        <th onClick={() => handleSort("zip")}>ZIP</th>
                        <th onClick={() => handleSort("email")}>Email</th>
                        <th onClick={() => handleSort("phoneNumber")}>Phone</th>
                        <th onClick={() => handleSort("vatNo")}>VAT No</th>
                        <th onClick={() => handleSort("lastOrderDate")}>Last Order Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((customer) => (
                        <tr key={customer.customerId}>
                            <td>{customer.customerId}</td>
                            <td>
                                <button
                                    className="link-button"
                                    onClick={() => handleEditCustomer(customer.customerId)}
                                >
                                    {customer.customerName}
                                </button>
                            </td>
                            <td>{customer.address}</td>
                            <td>{customer.cityCounty}</td>
                            <td>{customer.zip}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.vatNo}</td>
                            <td>
                                {customer.lastOrderDate
                                    ? new Date(customer.lastOrderDate).toLocaleDateString()
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

export default CustomerTable;
