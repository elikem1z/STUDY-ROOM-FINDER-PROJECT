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

export { API_BASE, BASE };
