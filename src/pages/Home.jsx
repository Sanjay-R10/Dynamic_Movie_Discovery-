import React from 'react'
import { useState, useEffect } from 'react'
import { searchMovies } from '../services/movieApi';
import MovieCard from '../components/MovieCard';


function Home() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await searchMovies("batman");

            console.log(data.Search); // Add this to check API if error

            if (data && data.Search) {
                setMovies(data.Search);
            }
        };
        fetchMovies();
    },[]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        const data = await searchMovies(searchTerm);

        if(data && data.Search){
            setMovies(data.Search);
            setError("");
        }else{
            setMovies([]);
            setError("No movies found.");
        }
    };

  return (
    <div className='min-h-screen text-white'>
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <h1 className='text-5xl font-bold text-center mb-12'>🎬 MovieHub</h1>
            {/* Search Bar */}
            <div className='flex justify-center items-center gap-3 mb-10'>
                <input className='w-full max-w-xl px-5 py-3 rounded-full bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500'
                    type='text'
                    placeholder='search movies...'
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    onKeyDown={(e) =>{
                        if(e.key === "Enter"){
                            handleSearch();
                        }
                    }}
                />
                <button
                    onClick={handleSearch}
                    className='px-6 py-3 bg-blue-600 hover:bg-blue-600 rounded-full font-semibold transition duration-300'
                >
                    Search
                </button>

            </div>
            {error && (
                <div className='w-full flex justify-center'>
                    <p className='text-center text-red-400 mb-8'>
                        {error}
                    </p>
                </div>
                )}

            {/* Movie Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12'>
                {movies.map((movie,index) =>(
                    <MovieCard key={movie.imdbID + index} movie={movie}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Home;