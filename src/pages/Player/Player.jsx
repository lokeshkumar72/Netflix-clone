import React, { useEffect, useState } from "react";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
};

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "unavailable"
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options,
    )
      .then((res) => {
        if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;

        const trailer =
          data.results?.find(
            (v) => v.site === "YouTube" && v.type === "Trailer",
          ) || data.results?.[0];

        if (trailer) {
          setApiData(trailer);
          setStatus("ready");
        } else {
          setStatus("unavailable");
        }
      })
      .catch((err) => {
        console.error("Trailer fetch failed:", err);
        if (!cancelled) setStatus("unavailable");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back button"
        onClick={() => {
          navigate("/");
        }}
        className="player__back"
      />

      {status === "loading" && (
        <div className="player-status">Loading trailer…</div>
      )}

      {status === "unavailable" && (
        <div className="player-status">
          No trailer is available for this title right now.
        </div>
      )}

      {status === "ready" && (
        <iframe
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {status === "ready" && (
        <div className="player-info">
          <p>{apiData.published_at?.slice(0, 10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      )}
    </div>
  );
};

export default Player;
