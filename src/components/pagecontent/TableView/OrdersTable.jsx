import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/TableView.css";

const OrdersTable = () => {
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const [criteria, setCriteria] = useState({
        customerName: null,
        pickupDateStart: null,
        pickupDateEnd: null,
        dropOffDateStart: null,
        dropOffDateEnd: null,
        minWeight: null,
        maxWeight: null,
        minWidth: null,
        maxWidth: null,
        minHeight: null,
        maxHeight: null,
        minLength: null,
        maxLength: null,
        sortBy: null,
        sortDirection: null,
        page: 0,
        size: 20,
    });

    const [searchFields, setSearchFields] = useState({
        customerName: "",
        pickupDateStart: "",
        pickupDateEnd: "",
        dropOffDateStart: "",
        dropOffDateEnd: "",
        minWeight: "",
        maxWeight: "",
        minWidth: "",
        maxWidth: "",
        minHeight: "",
        maxHeight: "",
        minLength: "",
        maxLength: "",
    });

    useEffect(() => {
        fetchOrders();
    }, [criteria]);

    const fetchOrders = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.post("/api/orders/table", criteria, headers);
            const { content, totalElements, totalPages } = response.data;

            setData(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error fetching orders:", error);
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
                pickupDateStart: searchFields.pickupDateStart || null,
                pickupDateEnd: searchFields.pickupDateEnd || null,
                dropOffDateStart: searchFields.dropOffDateStart || null,
                dropOffDateEnd: searchFields.dropOffDateEnd || null,
                minWeight: searchFields.minWeight.trim() ? parseFloat(searchFields.minWeight) : null,
                maxWeight: searchFields.maxWeight.trim() ? parseFloat(searchFields.maxWeight) : null,
                minWidth: searchFields.minWidth.trim() ? parseFloat(searchFields.minWidth) : null,
                maxWidth: searchFields.maxWidth.trim() ? parseFloat(searchFields.maxWidth) : null,
                minHeight: searchFields.minHeight.trim() ? parseFloat(searchFields.minHeight) : null,
                maxHeight: searchFields.maxHeight.trim() ? parseFloat(searchFields.maxHeight) : null,
                minLength: searchFields.minLength.trim() ? parseFloat(searchFields.minLength) : null,
                maxLength: searchFields.maxLength.trim() ? parseFloat(searchFields.maxLength) : null,
                page: 0, // Reset to the first page
            }));
        }
    };

    const handleReset = () => {
        setSearchFields({
            customerName: "",
            pickupDateStart: "",
            pickupDateEnd: "",
            dropOffDateStart: "",
            dropOffDateEnd: "",
            minWeight: "",
            maxWeight: "",
            minWidth: "",
            maxWidth: "",
            minHeight: "",
            maxHeight: "",
            minLength: "",
            maxLength: "",
        });

        setCriteria((prev) => ({
            ...prev,
            customerName: null,
            pickupDateStart: null,
            pickupDateEnd: null,
            dropOffDateStart: null,
            dropOffDateEnd: null,
            minWeight: null,
            maxWeight: null,
            minWidth: null,
            maxWidth: null,
            minHeight: null,
            maxHeight: null,
            minLength: null,
            maxLength: null,
            page: 0, // Reset to the first page
        }));
    };

    const handleEditOrder = (orderId) => {
        navigate(`/orders/edit/${orderId}`);
    };

    return (
        <div className="table-container">
            <div className="search-fields">
                <input
                    type="text"
                    name="customerName"
                    placeholder="Customer Name"
                    value={searchFields.customerName}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="minWeight"
                    placeholder="Min Weight (kg)"
                    value={searchFields.minWeight}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="maxWeight"
                    placeholder="Max Weight (kg)"
                    value={searchFields.maxWeight}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="minWidth"
                    placeholder="Min Width (cm)"
                    value={searchFields.minWidth}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="maxWidth"
                    placeholder="Max Width (cm)"
                    value={searchFields.maxWidth}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="minHeight"
                    placeholder="Min Height (cm)"
                    value={searchFields.minHeight}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="maxHeight"
                    placeholder="Max Height (cm)"
                    value={searchFields.maxHeight}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="minLength"
                    placeholder="Min Length (cm)"
                    value={searchFields.minLength}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <input
                    type="number"
                    name="maxLength"
                    placeholder="Max Length (cm)"
                    value={searchFields.maxLength}
                    onChange={handleSearchChange}
                    onKeyDown={applySearchCriteria}
                />
                <button onClick={handleReset} className="add-button">
                    Reset
                </button>
            </div>

            <div className="metadata">
                <button onClick={() => navigate("/orders/add")} className="add-button">
                    Add New Order
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
                        <th onClick={() => handleSort("orderId")}>ID</th>
                        <th onClick={() => handleSort("customerName")}>Customer Name</th>
                        <th onClick={() => handleSort("pickupDate")}>Pick Up Date</th>
                        <th onClick={() => handleSort("dropOffDate")}>Drop Off Date</th>
                        <th onClick={() => handleSort("weight")}>Weight (kg)</th>
                        <th onClick={() => handleSort("width")}>Width (cm)</th>
                        <th onClick={() => handleSort("height")}>Height (cm)</th>
                        <th onClick={() => handleSort("length")}>Length (cm)</th>
                        <th onClick={() => handleSort("orderDetails")}>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>
                                <button
                                    className="link-button"
                                    onClick={() => handleEditOrder(order.orderId)}
                                >
                                    {order.customerName}
                                </button>
                            </td>
                            <td>
                                {order.pickupDate
                                    ? new Date(order.pickupDate).toLocaleString()
                                    : ""}
                            </td>
                            <td>
                                {order.dropOffDate
                                    ? new Date(order.dropOffDate).toLocaleString()
                                    : ""}
                            </td>
                            <td>{order.weight}</td>
                            <td>{order.width}</td>
                            <td>{order.height}</td>
                            <td>{order.length}</td>
                            <td>{order.orderDetails}</td>
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

export default OrdersTable;
