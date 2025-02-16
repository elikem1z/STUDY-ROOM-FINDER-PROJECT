import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { API_BASE, BASE, GET_AVAIABLE_LOCATIONS } from "../constants";
import Select from "../Select";
import Loading from "../Loading";
import { motion } from "framer-motion";
import "./Home.css";

const Home = ({ loadingState, locationState, availableLocationsState, selectedLocationState, errorState }) => {
    const { locations, setLocations } = locationState;
    const { availableLocations, setAvailableLocations } = availableLocationsState;
    const { selectedLocation, setSelectedLocaction } = selectedLocationState;
    const { error, setError } = errorState;
    const { loading, setLoading } = loadingState;

    const navigate = useNavigate();

    useLayoutEffect(() => {
        setLoading(true);
        axios
            .get(`${API_BASE}${GET_AVAIABLE_LOCATIONS}`)
            .then((res) => {
                setAvailableLocations(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        setInterval(() => {
            axios
                .get(`${API_BASE}${GET_AVAIABLE_LOCATIONS}`)
                .then((res) => {
                    setAvailableLocations(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setError(err.message);
                });
        }, 1800000);
    }, []);

    const onSelectChange = (e) => {
        setSelectedLocaction(e.target.value);
    };

    const onSearch = (e) => {
        e.preventDefault();
        if (selectedLocation === "") {
            enqueueSnackbar("Please select a location", { variant: "error" });
            return;
        }
        if (error == null) navigate(`/status`);
    };

    return (
        <motion.main className="home">
            <motion.section
                className="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Find Your Perfect Study Space
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Welcome to StudyHub, your go-to resource for finding the perfect study spot on campus. Say goodbye
                    to wandering around in search of an empty classroom. Now, you can easily see real-time availability
                    of classrooms, ensuring you find a peaceful place to focus, study, and excel.
                </motion.p>
                <motion.p
                    className="disclaimer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    ! Some locations may be reserved for scheduled classes or events
                </motion.p>
            </motion.section>

            <motion.div
                className="search-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Select
                    options={locations}
                    value={selectedLocation}
                    onChange={onSelectChange}
                    placeholder="Select a location..."
                />
                <motion.button
                    onClick={onSearch}
                    type="submit"
                    className="search-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Check Status
                </motion.button>
            </motion.div>

            <motion.div
                className="available"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <motion.h2
                    className="available-text"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    Available Study Spaces
                </motion.h2>
                {loading ? (
                    <Loading />
                ) : (
                    <motion.div
                        className="available-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        {availableLocations.length > 0 ? (
                            availableLocations.map((location, key) => (
                                <motion.div
                                    key={key}
                                    className="location"
                                    // initial={{ opacity: 0, y: 20 }}
                                    // animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 * key }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <h3>{location}</h3>
                                </motion.div>
                            ))
                        ) : (
                            <motion.p
                                className="no-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                No available spaces at the moment
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </motion.main>
    );
};

export default Home;
