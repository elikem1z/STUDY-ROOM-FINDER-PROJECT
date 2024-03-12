import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE, POST_COURSES_RIGHT_NOW } from "../constants";

const StatusPage = ({ location, courseState }) => {
    const nav = useNavigate();

    const { courses, setCourses } = courseState;
    useEffect(() => {
        if (!location) {
            return nav("/");
        }

        axios
            .post(`${API_BASE}${POST_COURSES_RIGHT_NOW}`, {
                location: location,
            })
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <main className="status-page">
            <section className="status">
                <h1>Status Page</h1>
                <p>Location: {location}</p>
            </section>
        </main>
    );
};

export default StatusPage;
