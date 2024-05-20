export const fetchMovieDetails = async (imdbId) => {
    const url = `https://moviesdatabase.p.rapidapi.com/titles/${imdbId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3023ce5fbdmshe69a68359c9df10p1a0829jsn879c9b4dcc8d',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie details for ${imdbId}`);
        }
        const result = await response.json();
        console.log('Movie details for', imdbId, ':', result);
        return result;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

export const fetchFavoriteMoviesDetails = async (favoriteMovies) => {
    const movieDetailsPromises = favoriteMovies.map(imdbId => fetchMovieDetails(imdbId));
    const movieDetails = await Promise.all(movieDetailsPromises);
    console.log('Favorite movies details:', movieDetails);
    return movieDetails;
};


