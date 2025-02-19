import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../Css/EditView.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddFeedback = () => {
    const navigate = useNavigate();
    const [feedbackData, setFeedback] = useState({
        name: null,
        difficulty: 1,
        studymaterial_quality: 1,
        involvement: 1,
        course_structure: 1,
        teamwork: 1,
        outcome: 1
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback((prev) => ({
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

            await axios.post(`/api/feedback`, feedbackData, headers);
            alert("Feedback created successfully!");
            navigate('/home')
        } catch (err) {
            console.error("Error creating Feedback:", err);
            alert("Failed to create Feedback.");
        }
    };

    return (
        <div className="type-container">
            <form onSubmit={handleSubmit} className="Employee-form">
                {/* Editable fields */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={feedbackData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="difficulty">difficulty:</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={feedbackData.difficulty}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="studymaterial_quality">studymaterial_quality:</label>
                    <select
                        id="studymaterial_quality"
                        name="studymaterial_quality"
                        value={feedbackData.studymaterial_quality}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="involvement">involvement:</label>
                    <select
                        id="involvement"
                        name="involvement"
                        value={feedbackData.involvement}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="course_structure">course_structure:</label>
                    <select
                        id="course_structure"
                        name="course_structure"
                        value={feedbackData.course_structure}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="teamwork">teamwork:</label>
                    <select
                        id="teamwork"
                        name="teamwork"
                        value={feedbackData.teamwork}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="outcome">outcome:</label>
                    <select
                        id="outcome"
                        name="outcome"
                        value={feedbackData.outcome}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>


                <button type="submit">Create Feedback</button>
            </form>
        </div>
    );
};

export default AddFeedback;
