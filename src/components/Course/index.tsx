import React from "react";
import { convertTime } from "../utils";

const Course = ({ course, k = 0 }) => {
    return (
        <div className="status-container" key={k}>
            <h2 className="course-name">{course.courseCode}</h2>
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
    );
};

export default Course;
