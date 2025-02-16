import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <header>
            <nav className="flex justify-between items-center p-4">
                <div className="logo">StudyHub</div>
                {/* Hamburger button visible on small viewports */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle navigation"
                        aria-expanded={isMenuOpen}
                        className="p-2 bg-black bg-opacity-20 rounded-md"
                    >
                        <Menu size={24} />
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </button>
                </div>
                {/* Desktop Menu: hidden on small viewports */}
                <div className="hidden md:block">
                    <ul className="flex space-x-4 nav-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/search">Search Spaces</Link>
                        </li>
                        <li>
                            <Link to="/free-time">Find Common Free Time</Link>
                        </li>
                        <li>
                            <Link to="/how-it-works">How it works</Link>
                        </li>
                        <li>
                            <a href="/">Apps</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* Mobile Menu with a slightly transparent background */}
            {isMenuOpen && (
                <div className="overflow-hidden transition-all duration-300 md:hidden">
                    <div className="bg-black bg-opacity-20">
                        <ul className="flex flex-col p-4 space-y-2 nav-links">
                            <li>
                                <Link to="/" onClick={() => setMenuOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" onClick={() => setMenuOpen(false)}>
                                    Search Spaces
                                </Link>
                            </li>
                            <li>
                                <Link to="/free-time" onClick={() => setMenuOpen(false)}>
                                    Find Common Free Time
                                </Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" onClick={() => setMenuOpen(false)}>
                                    How it works
                                </Link>
                            </li>
                            <li>
                                <a href="/" onClick={() => setMenuOpen(false)}>
                                    Apps
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
