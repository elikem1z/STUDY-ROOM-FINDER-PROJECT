import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <div className="logo">Study Spot Finder</div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/how-it-works">How it works</Link>
                    </li>
                    <li>
                        <Link to="/meet-the-team">Meet the team</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
