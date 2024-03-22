let API_BASE;

if (import.meta.env.PROD) {
    API_BASE = import.meta.env.VITE_API_BASE;
} else if (import.meta.env.DEV) {
    API_BASE = "http://localhost:3000";
}
export const TIMETABLE_ROUTE = "/timetable";
export const GET_LOCATIONS = `${TIMETABLE_ROUTE}/locations`;
export const POST_COURSES_RIGHT_NOW = `${TIMETABLE_ROUTE}/courses-right-now`;
export const GET_AVAIABLE_LOCATIONS = `${TIMETABLE_ROUTE}/available-right-now`;
export const POST_GET_COURSES_TODAY = `${TIMETABLE_ROUTE}/courses-today`;

export { API_BASE };
