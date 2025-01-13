import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/TableView.css";
import Pagination from "../../sharedlayout/Pagination.jsx";

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
        sortDirection: "ASC",
        page: 0,
        size: 20,
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

            const queryParams = new URLSearchParams();
            Object.keys(criteria).forEach((key) => {
                if (criteria[key] !== "" && criteria[key] !== null) {
                    queryParams.append(key, criteria[key]);
                }
            });

            const url = `/api/orders/table?${queryParams.toString()}`;
            console.log("Fetching data from:", url);

            const response = await axios.get(url, headers);
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
            sortDirection: "ASC",
            page: 0,
            size: 20,
        });
    };

    const handleEditOrder = (orderId) => {
        navigate(`/orders/edit/${orderId}`);
    };

    const handlePageChange = (newPage) => {
        setCriteria((prev) => ({ ...prev, page: newPage }));
        setCurrentPage(newPage);
    };

    return (
        <div className="table-container">
            <div className="search-fields">
                <input type="text" name="customerName" placeholder="Customer Name" value={criteria.customerName || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="minWeight" placeholder="Min Weight (kg)" value={criteria.minWeight || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="maxWeight" placeholder="Max Weight (kg)" value={criteria.maxWeight || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="minWidth" placeholder="Min Width (cm)" value={criteria.minWidth || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="maxWidth" placeholder="Max Width (cm)" value={criteria.maxWidth || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="minHeight" placeholder="Min Height (cm)" value={criteria.minHeight || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="maxHeight" placeholder="Max Height (cm)" value={criteria.maxHeight || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="minLength" placeholder="Min Length (cm)" value={criteria.minLength || ""}
                       onChange={handleSearchChange}/>
                <input type="number" name="maxLength" placeholder="Max Length (cm)" value={criteria.maxLength || ""}
                       onChange={handleSearchChange}/>
                <button onClick={handleReset} className="add-button">Reset</button>
            </div>

            <div className="metadata">
                <button onClick={() => navigate("/orders/add")} className="add-button">Add New Order</button>
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
                        <th onClick={() => handleSort("orderId")}>ID {criteria.sortBy === "orderId" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("customerName")}>Customer
                            Name {criteria.sortBy === "customerName" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("pickupDate")}>Pick Up
                            Date {criteria.sortBy === "pickupDate" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("dropOffDate")}>Drop Off
                            Date {criteria.sortBy === "dropOffDate" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("weight")}>Weight
                            (kg) {criteria.sortBy === "weight" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("width")}>Width
                            (cm) {criteria.sortBy === "width" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("height")}>Height
                            (cm) {criteria.sortBy === "height" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("length")}>Length
                            (cm) {criteria.sortBy === "length" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                        <th onClick={() => handleSort("orderDetails")}>Details
                            {criteria.sortBy === "orderDetails" ? (criteria.sortDirection === "ASC" ? "▲" : "▼") : ""}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>
                                <button className="link-button"
                                        onClick={() => handleEditOrder(order.orderId)}>{order.customerName}</button>
                            </td>
                            <td>{order.pickupDate ? new Date(order.pickupDate).toLocaleString() : ""}</td>
                            <td>{order.dropOffDate ? new Date(order.dropOffDate).toLocaleString() : ""}</td>
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
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default OrdersTable;
