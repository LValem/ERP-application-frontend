import React, { useState } from "react";
import axios from "axios";
import "../../Css/EditView.css";

const AddCustomer = () => {
    const [customerData, setCustomerData] = useState({
        name: null,
        address: null,
        cityCounty: null,
        zip: null,
        email: null,
        phoneNumber: null,
        vatNo: null,
    });

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

            await axios.post(`/api/customers`, customerData, headers);
            alert("Customer created successfully!");
        } catch (err) {
            console.error("Error creating customer:", err);
            alert("Failed to create customer.");
        }
    };

    return (
        <div className="type-container">
            <form onSubmit={handleSubmit} className="customer-form">
                {/* Editable fields */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={customerData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cityCounty">City/County:</label>
                    <input
                        type="text"
                        id="cityCounty"
                        name="cityCounty"
                        value={customerData.cityCounty}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="zip">ZIP:</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={customerData.zip}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={customerData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vatNo">VAT Number:</label>
                    <input
                        type="text"
                        id="vatNo"
                        name="vatNo"
                        value={customerData.vatNo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Create Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;
