let API_BASE;
let BASE;

if (import.meta.env.PROD) {
    API_BASE = import.meta.env.VITE_API_BASE;
    BASE = "/study-spot-finder";
} else if (import.meta.env.DEV) {
    API_BASE = "http://localhost:3000";
    BASE = "";
}
export const TIMETABLE_ROUTE = "/timetable";
export const GET_LOCATIONS = `${TIMETABLE_ROUTE}/locations`;
export const POST_COURSES_RIGHT_NOW = `${TIMETABLE_ROUTE}/courses-right-now`;
export const GET_AVAIABLE_LOCATIONS = `${TIMETABLE_ROUTE}/available-right-now`;
export const POST_GET_COURSES_TODAY = `${TIMETABLE_ROUTE}/courses-today`;
export const POST_GET_COURSES_WITHIN = `${TIMETABLE_ROUTE}/courses-within`;
export const GET_AVAIBLE_AT = `${TIMETABLE_ROUTE}/available-at`;
export const GET_COURSE_SECTIONS = `${TIMETABLE_ROUTE}/courses`;
export const GET_COMMON_FREE_TIME = `${TIMETABLE_ROUTE}/common-free-time`;

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export { API_BASE, BASE };
