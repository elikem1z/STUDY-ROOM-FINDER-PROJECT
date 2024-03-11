// App.js 
import React from 'react'; const Header = () => { return (
<header>
  <nav>
    <div className="logo"><strong>STUDY SPOT FINDER</strong></div>
    <ul className="nav-links">
      <li><a href="./index.html">Home</a></li>
      <li><a href="./how-it-works.html">How it works</a></li>
      <li><a href="./meet-the-team.html">Meet the team</a></li>
    </ul>
  </nav>
</header>
); }; const MainContent = () => { return (
<main className="home">
  <section className="intro">
    <h1>Welcome to Ashesi Classroom Finder</h1>
    <p>
      Welcome to your go-to resource for finding the perfect study spot on
      campus. Say goodbye to wandering around in search of an empty classroom.
      Now, you can easily see real-time availability of classrooms, ensuring you
      find a peaceful place to focus, study, and excel.
    </p>
  </section>
  <div className="search-container">
    <input
      type="text"
      placeholder="Search for a classroom..."
      className="search-input"
    />
    <button type="submit" className="search-button">Search</button>
  </div>
</main>
); }; const Footer = () => { return (
<footer>
  <p>&copy; 2024 © Elikem Hamenoo, Edem K. Anagbah, Madiba Hudson-Quansah.</p>
</footer>
); }; const App = () => { return (
<div>
  <header />
  <MainContent />
  <footer />
</div>
); }; export default App;
