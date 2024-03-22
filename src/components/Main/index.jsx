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
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(import.meta.env.VITE_API_BASE);
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

    useEffect(() => {
        if (error != null) {
            console.log({ error });
            setTimeout(() => {
                console.log("Clearning error state");
                setError(null);
            }, 30e3);
        }
    }, [error]);

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

    const errorState = {
        error,
        setError,
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
                            errorState={errorState}
                        />
                    }
                />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route
                    path="/status"
                    element={
                        <StatusPage
                            errorState={errorState}
                            courseState={courseState}
                            location={selectedLocation}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
