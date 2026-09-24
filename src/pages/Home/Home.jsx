import React from "react";
import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";

import TitleCards from "../../components/TittleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  // The hero banner is a static promotional image, not tied to a fetched
  // movie/TMDB id, so Play/More Info can't open a real trailer for it here.
  // Scrolling to the row below gives the buttons real, working behavior
  // instead of doing nothing on click.
  const scrollToTrending = () => {
    const section = document.getElementById("category-now_playing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="home">
      <Navbar />

      {/* =========================
          HERO SECTION
      ========================= */}

      <div className="hero">
        <img src={hero_banner} alt="Hero Banner" className="banner-img" />

        <div className="hero-caption">
          <img src={hero_title} alt="Movie Title" className="caption-img" />

          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>

          <div className="hero-btns">
            <button className="btn" onClick={scrollToTrending}>
              <img src={play_icon} alt="Play" />
              Play
            </button>

            <button className="btn dark-btn" onClick={scrollToTrending}>
              <img src={info_icon} alt="More Info" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          MOVIE CATEGORIES
      ========================= */}

      <div className="more-cards">
        <TitleCards title="Trending Now" category="now_playing" id="now_playing" />

        <TitleCards title="Blockbuster Movies" category="top_rated" id="top_rated" />

        <TitleCards title="Only on MovieFlix" category="popular" id="popular" />

        <TitleCards title="Upcoming Movies" category="upcoming" id="upcoming" />

        <TitleCards title="Top Picks for You" category="now_playing" id="top-picks" />
      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <Footer />
    </div>
  );
};

export default Home;
