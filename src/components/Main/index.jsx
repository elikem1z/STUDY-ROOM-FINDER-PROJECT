import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Header from "../Header";
import HowItWorks from "../HowItWorks";
import MeetTeam from "../MeetTeam";
import Footer from "../Footer";
import StatusPage from "../StatusPage";
import axios from "axios";
import { API_BASE, GET_LOCATIONS } from "../constants";

const Main = () => {
    const [locations, setLocations] = useState([]);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [selectedLocation, setSelectedLocaction] = useState("");
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_BASE}${GET_LOCATIONS}`)
            .then((res) => {
                setLocations(res.data);
                setSelectedLocaction(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const locationState = {
        locations,
        setLocations,
    };

    const availableLocationsState = {
        availableLocations,
        setAvailableLocations,
    };

    const selectedLocationState = {
        selectedLocation,
        setSelectedLocaction,
    };

    const courseState = {
        courses,
        setCourses,
    };

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    exact
                    element={
                        <Home
                            locationState={locationState}
                            availableLocationsState={availableLocationsState}
                            selectedLocationState={selectedLocationState}
                        />
                    }
                />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/meet-the-team" element={<MeetTeam />} />
                <Route
                    path="/status"
                    element={
                        <StatusPage
                            courseState={courseState}
                            location={selectedLocation}
                        />
                    }
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Main;
