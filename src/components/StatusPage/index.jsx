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
                <h1 className="location-name">{location}</h1>
                {courses.length === 0 ? (
                    <h2 className="indicator">This location is available</h2>
                ) : (
                    <div className="classes-display">
                        <h2 className="indicator-red">
                            A class is in session at this location
                        </h2>
                        {courses.map((course, k) => (
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
