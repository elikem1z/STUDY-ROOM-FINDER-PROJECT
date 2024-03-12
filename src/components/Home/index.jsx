import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    API_BASE,
    GET_AVAIABLE_LOCATIONS,
    GET_LOCATIONS,
    POST_COURSES_RIGHT_NOW,
} from "../constants";
import Select from "../Select";

const Home = () => {
    const [locations, setLocations] = useState([]);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [selectedLocation, setSelectedLocaction] = useState(locations[0]);

    useEffect(() => {
        axios
            .get(`${API_BASE}${GET_LOCATIONS}`)
            .then((res) => {
                setLocations(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${API_BASE}${GET_AVAIABLE_LOCATIONS}`)
            .then((res) => {
                setAvailableLocations(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        setInterval(() => {
            axios
                .get(`${API_BASE}${GET_AVAIABLE_LOCATIONS}`)
                .then((res) => {
                    setAvailableLocations(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }, 1800000);
    }, []);

    const onSelectChange = (e) => {
        setSelectedLocaction(e.target.value);
    };

    const onSearch = (e) => {
        axios
            .post(`${API_BASE}${POST_COURSES_RIGHT_NOW}`, {
                location: selectedLocation,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
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
        </main>
    );
};

export default Home;
