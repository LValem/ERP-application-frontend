import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/EditView.css";

const EditOrder = () => {
    const { orderId } = useParams(); // Extract order ID from URL
    const [orderData, setOrderData] = useState({
        orderId: null,
        customerId: null,
        pickupDate: null,
        dropOffDate: null,
        weight: null,
        width: null,
        height: null,
        length: null,
        orderDetails: null,
    }); // Order data
    const [customers, setCustomers] = useState([]); // Customer list for dropdown
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        fetchOrderData();
        fetchCustomers();
    }, [orderId]);

    const fetchOrderData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`/api/orders/${orderId}`, headers);
            setOrderData(response.data);
        } catch (err) {
            console.error("Error fetching order data:", err);
            setError("Failed to fetch order data.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`/api/customers`, headers);
            setCustomers(response.data);
        } catch (err) {
            console.error("Error fetching customers:", err);
            setError("Failed to fetch customers.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCustomerChange = (e) => {
        setOrderData((prev) => ({
            ...prev,
            customerId: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            await axios.put(`/api/orders/${orderId}`, orderData, headers);
            alert("Order updated successfully!");
        } catch (err) {
            console.error("Error updating order data:", err);
            alert("Failed to update order.");
        }
    };

    if (isLoading) {
        return <p>Loading order data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="type-container">
            <form onSubmit={handleSubmit} className="order-form">
                {/* Non-editable field for orderId */}
                <div>
                    <label htmlFor="orderId">Order ID:</label>
                    <input
                        type="text"
                        id="orderId"
                        name="orderId"
                        value={orderData.orderId || ""}
                        disabled
                    />
                </div>

                {/* Dropdown for customer selection */}
                <div>
                    <label htmlFor="customerId">Customer:</label>
                    <select
                        id="customerId"
                        name="customerId"
                        value={orderData.customerId || ""}
                        onChange={handleCustomerChange}
                    >
                        <option value="" disabled>
                            Select a customer
                        </option>
                        {customers.map((customer) => (
                            <option key={customer.customerId} value={customer.customerId}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Editable fields */}
                <div>
                    <label htmlFor="pickupDate">Pick Up Date:</label>
                    <input
                        type="datetime-local"
                        id="pickupDate"
                        name="pickupDate"
                        value={orderData.pickupDate || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="dropOffDate">Drop Off Date:</label>
                    <input
                        type="datetime-local"
                        id="dropOffDate"
                        name="dropOffDate"
                        value={orderData.dropOffDate || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="weight">Weight (kg):</label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={orderData.weight || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="width">Width (cm):</label>
                    <input
                        type="number"
                        id="width"
                        name="width"
                        value={orderData.width || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="height">Height (cm):</label>
                    <input
                        type="number"
                        id="height"
                        name="height"
                        value={orderData.height || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="length">Length (cm):</label>
                    <input
                        type="number"
                        id="length"
                        name="length"
                        value={orderData.length || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="orderDetails">Order Details:</label>
                    <textarea
                        id="orderDetails"
                        name="orderDetails"
                        value={orderData.orderDetails || ""}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditOrder;
