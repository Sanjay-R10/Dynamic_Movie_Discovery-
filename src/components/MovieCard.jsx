import React from "react";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/movieApi";
import { Link } from "react-router-dom";


function MovieCard({movie}){
    const [rating, setRating] = useState(null);

    useEffect(()=>{
        const fetchDetails = async() =>{
            const data = await getMovieDetails(movie.imdbID);

            if (data && data.imdbRating !== "N/A") {
                setRating(data.imdbRating);
            }
        };
        fetchDetails();
    },[movie.imdbID]);

    return(
        <Link to={`/movie/${movie.imdbID}`}>
        <div className="bg-slate-800/70 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:scale-105 transition-all duration-300">
            {/* {MoviePoster} */}

            <div className="relative">

                <img  
                    className="w-full h-80 object-cover"
                   src={
                        movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"
                    }
               />
               <div className="absolute top-3 right-3 bg-black/70 text-yellow-400 text-sm font-semibold px-3 py-1 rounded-full">
                   ⭐ {rating ? rating : "..."}
               </div>

            </div>
            
            {/* Movie Info */}
            <div className="p-4">
                <h2 className="text-lg font-semibold truncate">
                    {movie.Title}
                </h2>
                <p className="text-slate-400 text-sm">
                    {movie.Year}
                </p>
            </div>
        </div>
        </Link>
    );
}

export default MovieCard;