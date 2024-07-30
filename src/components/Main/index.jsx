import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Home from "../Home";
import Header from "../Header";
import HowItWorks from "../HowItWorks";
import StatusPage from "../StatusPage";
import axios from "axios";
import { API_BASE, BASE, GET_LOCATIONS } from "../constants";

const Main = () => {
    const [locations, setLocations] = useState([]);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [selectedLocation, setSelectedLocaction] = useState("");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nextCourse, setNextCourse] = useState(null);
    console.log(BASE);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_BASE}${GET_LOCATIONS}`)
            .then((res) => {
                setLocations(res.data);
                setSelectedLocaction(res.data[0]);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (error != null) {
            enqueueSnackbar(error, {
                variant: "error",
            });
            setTimeout(() => {
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

    const loadingState = {
        loading,
        setLoading,
    };

    const errorState = {
        error,
        setError,
    };

    const nextCourseState = {
        nextCourse,
        setNextCourse,
    };

    return (
        <HashRouter>
            <SnackbarProvider />
            <Header />
            <Routes>
                <Route
                    path={`/`}
                    exact
                    element={
                        <Home
                            loadingState={loadingState}
                            locationState={locationState}
                            availableLocationsState={availableLocationsState}
                            selectedLocationState={selectedLocationState}
                            errorState={errorState}
                        />
                    }
                />
                <Route path={`/how-it-works`} element={<HowItWorks />} />
                <Route
                    path={`/status`}
                    element={
                        <StatusPage
                            loadingState={loadingState}
                            errorState={errorState}
                            courseState={courseState}
                            location={selectedLocation}
                            nextCourseState={nextCourseState}
                        />
                    }
                />
            </Routes>
        </HashRouter>
    );
};

export default Main;
