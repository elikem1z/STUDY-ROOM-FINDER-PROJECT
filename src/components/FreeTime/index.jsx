import React, { useState, useMemo, useEffect, useCallback, memo } from "react";
import "./index.css";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE, DAYS, GET_COMMON_FREE_TIME, GET_COURSE_SECTIONS } from "../constants";
import { X, Search } from "lucide-react";
import Loading from "../Loading";
import { useSnackbar, enqueueSnackbar } from "notistack";
import { convertTime } from "../utils";

// Memoized child components
const SelectedItemPill = memo(({ course, section, onRemove }) => (
    <div className="flex gap-2 items-center py-1 px-3 text-blue-800 bg-blue-100 rounded-full hover:bg-blue-200 hover:cursor-progress">
        <span className="text-sm">
            {course} - {section}
        </span>
        <button
            onClick={() => onRemove(course, section)}
            className="p-1 rounded-full hover:bg-blue-200"
            aria-label="Remove selection"
        >
            <X className="w-4 h-4" />
        </button>
    </div>
));

const FreeTimeResultCard = memo(({ startTime, endTime }) => (
    <motion.div
        className="space-card"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className="space-card-content">
            <h3 className="md:text-9xl space-name">
                {convertTime(startTime)} - {convertTime(endTime)}
            </h3>
        </div>
    </motion.div>
));

const CourseSelection = memo(
    ({
        selectedItems,
        selectedCourse,
        selectedSection,
        filteredCourses,
        currentCourse,
        searchQuery,
        onSearchChange,
        onRemove,
        onCourseChange,
        onSectionChange,
        onAdd,
    }) => (
        <div className="p-4 w-full max-w-5xl">
            <div className="flex flex-wrap gap-2 mb-4">
                {selectedItems.map(({ course, section }, index) => (
                    <SelectedItemPill
                        key={`${course}-${section}`}
                        course={course}
                        section={section}
                        onRemove={onRemove}
                    />
                ))}
            </div>

            <div className="relative mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={onSearchChange}
                        placeholder="Search courses..."
                        className="py-2 pr-4 pl-10 w-full text-white rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium">Course</label>
                    <select
                        value={selectedCourse}
                        onChange={onCourseChange}
                        className="py-2 px-3 w-full rounded-md border border-gray-300"
                    >
                        <option value="">Select a course</option>
                        {filteredCourses
                            .sort((a, b) => a.course.localeCompare(b.course))
                            .map((course) => (
                                <option key={course.course} value={course.course}>
                                    {course.course}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium">Section</label>
                    <select
                        value={selectedSection}
                        onChange={onSectionChange}
                        disabled={!selectedCourse}
                        className="py-2 px-3 w-full rounded-md border border-gray-300"
                    >
                        <option value="">Select a section</option>
                        {currentCourse?.sections.map((section) => (
                            <option key={section} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={onAdd}
                    disabled={!selectedCourse || !selectedSection}
                    className="py-2 px-4 text-white rounded-md transition-all duration-300 ease-in-out hover:cursor-pointer disabled:cursor-not-allowed bg-[#3b82f6] hover:translate-y-[-1px] hover:bg-[#2563eb] disabled:bg-black/50"
                >
                    Add
                </button>
            </div>
        </div>
    ),
);

const FreeTimeResults = memo(({ loading, freeTimes }) => {
    if (loading) return <Loading />;
    if (freeTimes.length === 0)
        return (
            <motion.div
                className="results-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h3 className="space-name">No Common Free Time Available</h3>
            </motion.div>
        );

    return (
        <motion.div
            className="results-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {freeTimes.map((timeSlot, index) => (
                <FreeTimeResultCard key={`${timeSlot.startTime}-${timeSlot.endTime}`} {...timeSlot} />
            ))}
        </motion.div>
    );
});

const DaySelection = memo(({ day, onDayChange }) => (
    <div>
        <label className="block mb-1 text-sm font-medium">Day</label>
        <select
            onChange={onDayChange}
            value={day}
            placeholder="Enter the day you want to meet"
            className="py-2 px-3 pr-4 pl-10 w-full text-white rounded-md border border-gray-300"
        >
            {DAYS.map((day, index) => (
                <option key={day} value={day}>
                    {day}
                </option>
            ))}
        </select>
    </div>
));

const DurationInput = memo(({ duration, onDurationChange }) => (
    <div>
        <label className="block mb-1 text-sm font-medium">Minimum Duration (minutes)</label>
        <input
            value={duration}
            onChange={onDurationChange}
            type="number"
            min="10"
            max="240"
            placeholder="Enter the minimum duration"
            className="py-2 px-3 w-full text-white rounded-md border border-gray-300"
        />
    </div>
));

const FreeTime = () => {
    const [state, setState] = useState({
        loading: false,
        courseSections: [],
        selectedCourse: "",
        selectedSection: "",
        selectedItems: [],
        searchQuery: "",
        duration: 10,
        day: "Monday",
        error: "",
        freeTimes: [],
    });

    // Memoized callbacks
    const getCourseSections = useCallback(async (day, signal = null) => {
        try {
            setState((prev) => ({ ...prev, loading: true }));
            const res = await axios.get(`${API_BASE}${GET_COURSE_SECTIONS}?day=${day}`, { signal });
            setState((prev) => ({ ...prev, courseSections: res.data }));
        } catch (err) {
            console.log({ err });
            // enqueueSnackbar(err, { variant: "error" });
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, []);

    const handleSearchChange = useCallback((e) => {
        setState((prev) => ({ ...prev, searchQuery: e.target.value }));
    }, []);

    const handleCourseChange = useCallback((e) => {
        setState((prev) => ({
            ...prev,
            selectedCourse: e.target.value,
            selectedSection: "",
            error: "",
        }));
    }, []);

    const handleSectionChange = useCallback((e) => {
        setState((prev) => ({
            ...prev,
            selectedSection: e.target.value,
            error: "",
        }));
    }, []);

    const handleDurationChange = useCallback((e) => {
        const value = parseInt(e.target.value);
        setState((prev) => ({ ...prev, duration: value }));
    }, []);

    const handleDayChange = useCallback(
        (e) => {
            const newDay = e.target.value;
            setState((prev) => ({
                ...prev,
                day: newDay,
                selectedCourse: "",
                selectedSection: "",
                selectedItems: [],
                error: "",
            }));
            getCourseSections(newDay);
        },
        [getCourseSections],
    );

    const handleRemove = useCallback((courseToRemove, sectionToRemove) => {
        setState((prev) => ({
            ...prev,
            selectedItems: prev.selectedItems.filter(
                (item) => !(item.course === courseToRemove && item.section === sectionToRemove),
            ),
            error: "",
        }));
    }, []);

    const handleAdd = useCallback(() => {
        setState((prev) => {
            if (!prev.selectedCourse || !prev.selectedSection) return prev;

            const exists = prev.selectedItems.some(
                (item) => item.course === prev.selectedCourse && item.section === prev.selectedSection,
            );

            if (exists) {
                return { ...prev, error: "This combination already exists" };
            }

            return {
                ...prev,
                selectedItems: [
                    ...prev.selectedItems,
                    {
                        course: prev.selectedCourse,
                        section: prev.selectedSection,
                    },
                ],
                selectedCourse: "",
                selectedSection: "",
                error: "",
            };
        });
    }, []);

    const getFreeTimes = useCallback(async () => {
        const courseSection = state.selectedItems.map(({ course, section }) => ({
            course,
            section,
        }));

        try {
            setState((prev) => ({ ...prev, loading: true }));
            const res = await axios.post(`${API_BASE}${GET_COMMON_FREE_TIME}`, {
                courseSection,
                day: state.day,
                minDuration: state.duration,
            });
            setState((prev) => ({ ...prev, freeTimes: res.data }));
        } catch (err) {
            setState((prev) => ({ ...prev, error: err.message }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, [state.selectedItems, state.day, state.duration]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            if (state.selectedItems.length < 2) {
                setState((prev) => ({ ...prev, error: "Please select at least two courses and sections" }));
                return;
            }

            if (!state.duration) {
                setState((prev) => ({ ...prev, error: "Please enter the minimum duration" }));
                return;
            }

            if (state.duration < 10 || state.duration > 240) {
                setState((prev) => ({
                    ...prev,
                    error: "Duration should be between 10 and 240 minutes",
                }));
                return;
            }

            await getFreeTimes();
        },
        [state.selectedItems.length, state.duration, getFreeTimes],
    );

    // Memoized values
    const filteredCourses = useMemo(
        () =>
            state.courseSections.filter((course) =>
                course.course.toLowerCase().includes(state.searchQuery.toLowerCase()),
            ),
        [state.courseSections, state.searchQuery],
    );

    const currentCourse = useMemo(
        () => state.courseSections.find((c) => c.course === state.selectedCourse),
        [state.courseSections, state.selectedCourse],
    );

    // Effects
    useEffect(() => {
        const controller = new AbortController();
        getCourseSections(state.day, controller.signal);
        return () => controller.abort();
    }, [getCourseSections, state.day]);

    useEffect(() => {
        if (state.error) {
            if (state.error.code && state.error.code !== "ERR_CANCELED") {
                enqueueSnackbar(state.error, { variant: "error" });
            }
            setState((prev) => ({ ...prev, error: "" }));
        }
    }, [state.error]);

    return (
        <div className="free-time-page-container">
            <div className="free-time-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Find the Best Time for Meetings
                </motion.h1>
            </div>

            <motion.form
                onSubmit={handleSubmit}
                className="free-time-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {state.courseSections.length > 0 && (
                    <CourseSelection
                        selectedItems={state.selectedItems}
                        selectedCourse={state.selectedCourse}
                        selectedSection={state.selectedSection}
                        filteredCourses={filteredCourses}
                        currentCourse={currentCourse}
                        searchQuery={state.searchQuery}
                        onSearchChange={handleSearchChange}
                        onRemove={handleRemove}
                        onCourseChange={handleCourseChange}
                        onSectionChange={handleSectionChange}
                        onAdd={handleAdd}
                    />
                )}

                <div className="px-4 space-y-5 w-full max-w-5xl">
                    <DaySelection day={state.day} onDayChange={handleDayChange} />
                    <DurationInput duration={state.duration} onDurationChange={handleDurationChange} />
                    <button disabled={state.loading} type="submit" className="free-time-button search-button">
                        Find Free Time
                    </button>
                </div>
            </motion.form>

            <FreeTimeResults loading={state.loading} freeTimes={state.freeTimes} />
        </div>
    );
};

export default memo(FreeTime);
