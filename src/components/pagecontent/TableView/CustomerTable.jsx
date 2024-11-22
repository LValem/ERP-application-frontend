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

    const [searchFields, setSearchFields] = useState({
        customerName: "",
        address: "",
        cityCounty: "",
        zip: "",
        email: "",
        phoneNumber: "",
        vatNo: "",
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
                customerName: searchFields.customerName.trim() ? searchFields.customerName : null,
                address: searchFields.address.trim() ? searchFields.address : null,
                cityCounty: searchFields.cityCounty.trim() ? searchFields.cityCounty : null,
                zip: searchFields.zip.trim() ? searchFields.zip : null,
                email: searchFields.email.trim() ? searchFields.email : null,
                phoneNumber: searchFields.phoneNumber.trim() ? searchFields.phoneNumber : null,
                vatNo: searchFields.vatNo.trim() ? searchFields.vatNo : null,
                page: 0, // Reset to the first page
            }));
        }
    };

    const handleReset = () => {
        setSearchFields({
            customerName: "",
            address: "",
            cityCounty: "",
            zip: "",
            email: "",
            phoneNumber: "",
            vatNo: "",
        });

        setCriteria((prev) => ({
            ...prev,
            customerName: null,
            address: null,
            cityCounty: null,
            zip: null,
            email: null,
            phoneNumber: null,
            vatNo: null,
            page: 0, // Reset to the first page
        }));
    };

    return (
        <div className="table-container">
            {/* Search Fields */}
            <div className="search-fields">
                <input
                    type="text"
                    name="customerName"
                    placeholder="Search by Name"
                    value={searchFields.customerName}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Search by Address"
                    value={searchFields.address}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="cityCounty"
                    placeholder="Search by City/County"
                    value={searchFields.cityCounty}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="Search by ZIP"
                    value={searchFields.zip}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Search by Email"
                    value={searchFields.email}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Search by Phone"
                    value={searchFields.phoneNumber}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="text"
                    name="vatNo"
                    placeholder="Search by VAT No"
                    value={searchFields.vatNo}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                {/* Reset Button */}
                <button onClick={handleReset} className="add-button">
                    Reset
                </button>
            </div>

            <div className="metadata">
                <button onClick={() => navigate("/customers/add")} className="add-button">
                    Add New Customer
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
