import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category, id }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = import.meta.env.VITE_TMDB_API_TOKEN;

        if (!token) {
          throw new Error("TMDB API token not configured");
        }

        const movieCategory = category || "now_playing";

        const url =
          "https://api.themoviedb.org/3/movie/" +
          movieCategory +
          "?language=en-US&page=1";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch movies from TMDB API");
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setApiData(data.results);
        } else {
          setApiData(cards_data);
        }
      } catch (error) {
        console.warn("Using fallback card data:", error.message || error);
        setApiData(cards_data);
      }
    };

    fetchMovies();
  }, [category]);

  useEffect(() => {
    const currentRef = cardsRef.current;

    if (!currentRef) {
      return;
    }

    const handleWheel = (event) => {
      event.preventDefault();
      currentRef.scrollLeft += event.deltaY;
    };

    currentRef.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className="title-cards"
      id={id ? "category-" + id : undefined}
    >
      <h2>{title || "Popular on MovieFlix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          const imageUrl = card.backdrop_path
            ? "https://image.tmdb.org/t/p/w500" + card.backdrop_path
            : card.image;

          const movieTitle =
            card.original_title ||
            card.title ||
            card.name ||
            "Movie";

          const cardId = card.id || "unknown-" + index;

          return (
            <Link
              to={"/player/" + cardId}
              className="card"
              key={cardId}
            >
              <img
                src={imageUrl}
                alt={movieTitle}
                loading="lazy"
              />

              <p>{movieTitle}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
