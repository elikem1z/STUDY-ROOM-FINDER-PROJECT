import React from "react";

const Home = () => {
    return (
        <main className="home">
            <section className="intro">
                <h1>Welcome to Ashesi Classroom Finder</h1>
                <p>
                    Welcome to your go-to resource for finding the perfect study
                    spot on campus. Say goodbye to wandering around in search of
                    an empty classroom. Now, you can easily see real-time
                    availability of classrooms, ensuring you find a peaceful
                    place to focus, study, and excel.
                </p>
            </section>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a classroom..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </div>
        </main>
    );
};

export default Home;
