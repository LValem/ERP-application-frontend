import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/EditView.css";

const EditCustomer = () => {
    const { customerId } = useParams(); // Extract customer ID from URL
    const [customerData, setCustomerData] = useState({
        customerId: null,
        name: null,
        address: null,
        cityCounty: null,
        zip: null,
        email: null,
        phoneNumber: null,
        vatNo: null,
    }); // Customer data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        fetchCustomerData();
    }, [customerId]);

    const fetchCustomerData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`/api/customers/${customerId}`, headers);
            setCustomerData(response.data);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching customer data:", err);
            setError("Failed to fetch customer data.");
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prev) => ({
            ...prev,
            [name]: value,
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

            await axios.put(`/api/customers/${customerId}`, customerData, headers);
            alert("Customer data updated successfully!");
        } catch (err) {
            console.error("Error updating customer data:", err);
            alert("Failed to update customer data.");
        }
    };

    if (isLoading) {
        return <p>Loading customer data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="type-container">
            <form onSubmit={handleSubmit} className="customer-form">
                {/* Non-editable field for customerId */}
                <div>
                    <label htmlFor="customerId">Customer ID:</label>
                    <input
                        type="text"
                        id="customerId"
                        name="customerId"
                        value={customerData.customerId || ""}
                        disabled
                    />
                </div>

                {/* Editable fields */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerData.name || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={customerData.address || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="cityCounty">City/County:</label>
                    <input
                        type="text"
                        id="cityCounty"
                        name="cityCounty"
                        value={customerData.cityCounty || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="zip">ZIP:</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={customerData.zip || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerData.email || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={customerData.phoneNumber || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="vatNo">VAT Number:</label>
                    <input
                        type="text"
                        id="vatNo"
                        name="vatNo"
                        value={customerData.vatNo || ""}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCustomer;
