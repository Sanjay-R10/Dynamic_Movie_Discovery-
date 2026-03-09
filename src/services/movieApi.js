const API_KEY = 'c0775fec';
const BASE_URL = 'https://www.omdbapi.com/';

// Function to search movies by title
const searchMovies = async(searchTerm) =>{
    try{
        // Build the complete URL with search term
        const url = `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}`;

        // Fetch data from the API
        const response = await fetch(url)

        // Convert the response to JSON format
        const data = await response.json();

        // Return the data
        return data;
    } 
    catch(error) {
        // If something goes wrong, log the error
        console.error("Error fetching movies:",error);
        return null;
    }
    };

// Function to get detailed info about a single movie

const getMovieDetails = async(movieId) =>{
    try{
        const url = `${BASE_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error){
        console.error("Error fetching movie details:", error);
        return null;
    }
};

export {searchMovies,getMovieDetails};