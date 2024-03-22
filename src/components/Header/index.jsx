import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
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
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
