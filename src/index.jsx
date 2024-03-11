import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Header from "./components/Header";
import HowItWorks from "./components/HowItWorks";
import MeetTeam from "./components/MeetTeam";
import Footer from "./components/Footer";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const router = (
    <React.StrictMode>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/meet-the-team" element={<MeetTeam />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </React.StrictMode>
);

root.render(router);
