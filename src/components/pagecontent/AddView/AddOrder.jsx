import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Css/EditView.css";

const AddOrder = () => {
    const [orderData, setOrderData] = useState({
        customerId: null,
        pickupDate: null,
        dropOffDate: null,
        weight: null,
        width: null,
        height: null,
        length: null,
        orderDetails: null,
    });

    const [customers, setCustomers] = useState([]); // Customer list for dropdown
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        fetchCustomers();
    }, []);

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

            await axios.post(`/api/orders`, orderData, headers);
            alert("Order created successfully!");
        } catch (err) {
            console.error("Error creating order:", err);
            alert("Failed to create order.");
        }
    };

    return (
        <div className="type-container">
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="order-form">
                {/* Customer dropdown */}
                <div>
                    <label htmlFor="customerId">Customer:</label>
                    <select
                        id="customerId"
                        name="customerId"
                        value={orderData.customerId || ""}
                        onChange={handleCustomerChange}
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
                    />
                </div>
                <div>
                    <label htmlFor="orderDetails">Order Details:</label>
                    <textarea
                        id="orderDetails"
                        name="orderDetails"
                        value={orderData.orderDetails || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">Create Order</button>
            </form>
        </div>
    );
};

export default AddOrder;
