import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { convertTimeNum } from "../utils";
import {
    API_BASE,
    POST_COURSES_RIGHT_NOW,
    POST_GET_COURSES_TODAY,
    POST_GET_COURSES_WITHIN,
} from "../constants";
import Loading from "../Loading";
import Course from "../Course";

const StatusPage = ({
    location,
    courseState,
    errorState,
    loadingState,
    nextCourseState,
}) => {
    const nav = useNavigate();
    const { loading, setLoading } = loadingState;
    const { courses, setCourses } = courseState;
    const { error, setError } = errorState;
    const { nextCourse, setNextCourse } = nextCourseState;
    const [buttonState, setButtonState] = useState(true);
    const [available, setAvailable] = useState(false);

    const rightNow = () => {
        const controller = new AbortController();
        setLoading(true);
        axios
            .post(`${API_BASE}${POST_COURSES_RIGHT_NOW}`, {
                signal: controller,
                location: location,
            })
            .then((res) => {
                setAvailable(res.data.length == 0);
                setCourses(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        return controller;
    };

    const today = () => {
        const controller = new AbortController();
        setLoading(true);
        axios
            .post(`${API_BASE}${POST_GET_COURSES_TODAY}`, {
                signal: controller,
                location: location,
            })
            .then((res) => {
                setCourses(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        return controller;
    };

    const resolveNextCourse = (data) => {
        console.log({ data });
        const courses = data.filter(
            (c) => convertTimeNum(c.startTime) > new Date().getTime(),
        );
        setNextCourse(courses[0]);
    };

    const nextClass = () => {
        const controller = new AbortController();
        setLoading(true);
        axios
            .post(`${API_BASE}${POST_GET_COURSES_WITHIN}`, {
                signal: controller,
                location: location,
                hours: 1.5,
            })
            .then((res) => {
                if (res.data.length > 0) {
                    resolveNextCourse(res.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        return controller;
    };

    useLayoutEffect(() => {
        if (!location) return nav("/");
    }, []);

    useEffect(() => {
        setCourses([]);
        if (!location) {
            return nav("/");
        }

        const rnCon = rightNow();
        const nextCon = nextClass();
        return () => {
            rnCon.abort();
            nextCon.abort();
        };
    }, []);

    useEffect(() => {
        let controller = null;
        let nextCon = null;
        if (buttonState) {
            controller = rightNow();
            nextCon = nextClass();
        } else {
            controller = today();
        }

        return () => {
            if (controller) controller.abort();
            if (nextCon) nextCon.abort();
        };
    }, [buttonState]);

    return (
        <main className="status-page">
            <section className="status">
                <div>
                    <Link className="back-button" to={"/"}>
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
                <h2
                    className={
                        loading
                            ? "loading"
                            : available
                              ? "indicator"
                              : "status-indicator"
                    }
                >
                    {loading
                        ? "Loading..."
                        : available
                          ? "This location is available"
                          : "A class is in session at this location"}
                </h2>
                {loading ? (
                    <Loading loadingText="Loading Classes" />
                ) : courses.length === 0 ? (
                    <></>
                ) : (
                    <div className="classes-display">
                        {courses
                            .sort(
                                (c1, c2) =>
                                    convertTimeNum(c1.startTime) -
                                    convertTimeNum(c2.endTime),
                            )
                            .map((course, k) => (
                                <Course course={course} k={k} />
                            ))}
                    </div>
                )}
                {nextCourse && available && buttonState ? (
                    <div className="next-class-display">
                        <h2 className="next-class">Next Class</h2>
                        <Course course={nextCourse} />
                    </div>
                ) : (
                    <></>
                )}
            </section>
        </main>
    );
};

export default StatusPage;
