import React, { useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { API_BASE, BASE, GET_AVAIABLE_LOCATIONS } from "../constants";
import Select from "../Select";
import Loading from "../Loading";

const Home = ({
    loadingState,
    locationState,
    availableLocationsState,
    selectedLocationState,
    errorState,
}) => {
    const { locations, setLocations } = locationState;
    const { availableLocations, setAvailableLocations } =
        availableLocationsState;
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
        <main className="home">
            <section className="intro">
                <h1>Welcome to Ashesi Classroom Finder</h1>
                <p>
                    Welcome to your go-to resource for finding the perfect study
                    spot on campus. Say goodbye to wandering around in search of
                    an empty classroom. Now, you can easily see real-time
                    availability of classrooms, ensuring you find a peaceful
                    place to focus, study, and excel.
                </p>
                <p className="disclaimer">
                    DISCLAIMER: Some locations maybe booked beforehand
                </p>
            </section>
            <div className="search-container">
                <Select
                    options={locations}
                    value={selectedLocation}
                    onChange={onSelectChange}
                />
                <button
                    onClick={onSearch}
                    type="submit"
                    className="search-button"
                >
                    Search
                </button>
            </div>
            <div className="available">
                <h2 className="available-text">Classes Available Now</h2>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="available-grid">
                        {availableLocations.length > 0 ? (
                            availableLocations.map((location, key) => (
                                <div key={key} className="location">
                                    <h3>{location}</h3>
                                </div>
                            ))
                        ) : (
                            <p>No available locations</p>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home;
