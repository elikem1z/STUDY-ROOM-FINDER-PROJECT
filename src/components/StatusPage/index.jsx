import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
    API_BASE,
    POST_COURSES_RIGHT_NOW,
    POST_GET_COURSES_TODAY,
} from "../constants";

const StatusPage = ({ location, courseState, errorState }) => {
    const nav = useNavigate();

    const rightNow = () => {
        const controller = new AbortController();
        axios
            .post(`${API_BASE}${POST_COURSES_RIGHT_NOW}`, {
                signal: controller,
                location: location,
            })
            .then((res) => {
                setAvailable(res.data.length == 0);
                setCourses(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });

        return controller;
    };

    const today = () => {
        const controller = new AbortController();
        axios
            .post(`${API_BASE}${POST_GET_COURSES_TODAY}`, {
                signal: controller,
                location: location,
            })
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
        return controller;
    };

    const { courses, setCourses } = courseState;
    const { error, setError } = errorState;
    const [buttonState, setButtonState] = useState(true);
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        if (!location) {
            return nav("/");
        }

        const controller = rightNow();
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        let controller = null;
        if (buttonState) {
            controller = rightNow();
        } else {
            controller = today();
        }

        return () => {
            controller.abort();
        };
    }, [buttonState]);

    const convertTimeNum = (time) => {
        return new Date(
            new Date().toISOString().split("T")[0] + "T" + time,
        ).getTime();
    };

    const convertTime = (time) => {
        const t = new Date(
            new Date().toISOString().split("T")[0] + "T" + time,
        ).getTime();
        return new Date(t).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };

    return (
        <main className="status-page">
            <section className="status">
                <div>
                    <Link className="back-button" to="/">
                        Back
                    </Link>
                    <h1 className="location-name">{location}</h1>
                </div>
                <div className="state-buttons">
                    <button
                        disabled={buttonState}
                        onClick={(e) => setButtonState(true)}
                        className="state-button"
                    >
                        Right Now
                    </button>
                    <button
                        disabled={!buttonState}
                        onClick={(e) => setButtonState(false)}
                        className="state-button"
                    >
                        Today
                    </button>
                </div>
                <h2 className={available ? "indicator" : "status-indicator"}>
                    {available
                        ? "This location is available"
                        : "A class is in session at this location"}
                </h2>
                {courses.length === 0 ? (
                    <></>
                ) : (
                    <div className="classes-display">
                        {courses
                            .sort(
                                (c1, c2) =>
                                    convertTimeNum(c1.startTime) >
                                    convertTimeNum(c2.endTime),
                            )
                            .map((course, k) => (
                                <div className="status-container" key={k}>
                                    <h2 className="course-name">
                                        {course.courseCode}
                                    </h2>
                                    <p>
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Section
                                        </span>
                                        : {course.section}
                                    </p>
                                    <p>
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Start Time
                                        </span>
                                        : {convertTime(course.startTime)}
                                    </p>
                                    <p>
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            End Time
                                        </span>
                                        : {convertTime(course.endTime)}
                                    </p>
                                </div>
                            ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default StatusPage;
