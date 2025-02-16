import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";
import "./Search.css";
import { convertTime, convertTimeNum } from "../utils";
import { API_BASE, GET_AVAIBLE_AT } from "../constants";

const Search = () => {
    const [selectedTime, setSelectedTime] = useState(
        new Date(Date.now()).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        }),
    );
    const [availableSpaces, setAvailableSpaces] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSearch = async () => {
        if (!selectedTime) {
            enqueueSnackbar("Please select a time", { variant: "warning" });
            return;
        }

        const unixTime = convertTimeNum(selectedTime);
        console.log({ unixTime });

        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE}${GET_AVAIBLE_AT}`, {
                time: unixTime,
            });
            setAvailableSpaces(response.data);
        } catch (error) {
            enqueueSnackbar("Error fetching available spaces", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = (spaceId) => {
        console.log(`Clicked location ${spaceId}`);
        enqueueSnackbar("Booking feature coming soon!", { variant: "info" });
    };

    return (
        <div className="search-page-container">
            <div className="search-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Find Your Perfect Study Space
                </motion.h1>
            </div>

            <motion.div
                className="search-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="time-input-container">
                    <label htmlFor="time">Select Time</label>
                    <input
                        type="time"
                        id="time"
                        className="time-input"
                        value={selectedTime}
                        onChange={handleTimeChange}
                    />
                </div>
                <button onClick={handleSearch} disabled={loading} className="search-button">
                    {loading ? "Searching..." : "Find Available Spaces"}
                </button>
            </motion.div>

            {availableSpaces.length > 0 && (
                <motion.div
                    className="results-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="space-grid">
                        {availableSpaces.map((space, key) => (
                            <motion.div
                                key={key}
                                className="space-card"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="space-card-content">
                                    <h3 className="space-name">{space}</h3>
                                    {/* <p className="space-capacity">Capacity: {space.capacity} people</p> */}
                                    {/* <div className="feature-tags"> */}
                                    {/*     {space.features.map((feature, index) => ( */}
                                    {/*         <span key={index} className="feature-tag"> */}
                                    {/*             {feature} */}
                                    {/*         </span> */}
                                    {/*     ))} */}
                                    {/* </div> */}
                                    <button
                                        className="book-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleBooking(key);
                                        }}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {availableSpaces.length === 0 && !loading && selectedTime && (
                <motion.div
                    className="results-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="no-results">No available spaces found for the selected time.</div>
                </motion.div>
            )}
        </div>
    );
};

export default Search;
