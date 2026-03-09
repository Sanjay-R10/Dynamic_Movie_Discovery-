import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
    };

    fetchDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/"
          className="text-blue-400 hover:underline mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Poster */}
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.Title}
            className="w-full rounded-2xl shadow-lg"
          />

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {movie.Title}
            </h1>

            <p className="text-slate-400 mb-2">
              {movie.Year} • {movie.Genre}
            </p>

            <p className="mb-4">
              ⭐ IMDb Rating: {movie.imdbRating}
            </p>

            <p className="text-slate-300 leading-relaxed">
              {movie.Plot}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
