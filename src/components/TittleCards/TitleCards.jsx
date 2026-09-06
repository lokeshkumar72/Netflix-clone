import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";
import { TMDB_TOKEN } from "../../config";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + TMDB_TOKEN,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();

    const scrollSpeed = 5;
    const acceleration = 1.1;
    const velocity = Math.abs(event.deltaY) * acceleration;
    const scrollAmount = event.deltaY * (scrollSpeed + velocity);

    if (cardsRef.current) {
      cardsRef.current.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category || "now_playing"
          }?language=en-US&page=1`,
          options,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setApiData(data.results);
        } else {
          setApiData(cards_data);
        }
      } catch (error) {
        console.error("TMDB API Error:", error);
        setApiData(cards_data);
      }
    };

    fetchMovies();

    const currentRef = cardsRef.current;

    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          const imageUrl = card.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
            : card.image;

          const movieTitle =
            card.original_title || card.title || card.name || "Movie";

          return (
            <Link
              to={`/player/${card.id}`}
              className="card"
              key={card.id || index}
            >
              <img src={imageUrl} alt={movieTitle} />

              <p>{movieTitle}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
