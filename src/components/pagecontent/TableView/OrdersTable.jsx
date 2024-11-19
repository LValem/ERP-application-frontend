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
        pickupDate: null,
        dropOffDate: null,
        weight: null,
        width: null,
        height: null,
        length: null,
        sortBy: null,
        sortDirection: null,
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

    const handleEditOrder = (orderId) => {
        navigate(`/orders/edit/${orderId}`); // Navigate to edit page with orderId
    };

    return (
        <div className="table-container">
            <div className="metadata">
                <p>Total Orders: {totalElements}</p>
                <p>Total Pages: {totalPages}</p>
                <p>Current Page: {currentPage + 1}</p>
                <button onClick={() => navigate("/orders/add")} className="add-button">
                    Add New Order
                </button>
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
                                    ? new Date(order.pickupDate).toLocaleDateString()
                                    : ""}
                            </td>
                            <td>
                                {order.dropOffDate
                                    ? new Date(order.dropOffDate).toLocaleDateString()
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
