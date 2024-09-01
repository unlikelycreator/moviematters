import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/suggest.css';
import './css/Screen.css';

function SuggestScreen() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [ratingThreshold, setRatingThreshold] = useState(4);
  const [movie, setMovie] = useState(null);

  const fetchGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIwZmY2Mzk1Yjk0MzJkZGY3NGI3NTFkZTMxYTNhNSIsInN1YiI6IjYxYjU4NjViOTA3ZjI2MDA0MDFjNzQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ST2cDPGD4SDET5RM3eFjmFyfvfYE9SSoW3ErGFDJnmA",
      },
    };

    try {
      const response = await axios.get(url, options);
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const suggestMovie = async () => {
    const yearStart = `${selectedYear}-01-01`;
    const yearEnd = `${selectedYear}-12-31`;

    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&vote_average.gte=${ratingThreshold}&primary_release_date.gte=${yearStart}&primary_release_date.lte=${yearEnd}&include_adult=true&language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIwZmY2Mzk1Yjk0MzJkZGY3NGI3NTFkZTMxYTNhNSIsInN1YiI6IjYxYjU4NjViOTA3ZjI2MDA0MDFjNzQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ST2cDPGD4SDET5RM3eFjmFyfvfYE9SSoW3ErGFDJnmA",
      },
    };

    try {
      const response = await axios.get(url, options);
      const movies = response.data.results;
      if (movies.length) {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());
  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Adjust as needed

  return (
    <div className='screen'>
      <div className='suggest-screen'>
        <div className='controls'>
          <select
            className='suggest-select'
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value='' disabled>
              Select Genre
            </option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select
            className='suggest-select'
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value='' disabled>
              Select Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className='suggest-select'
            value={ratingThreshold}
            onChange={(e) => setRatingThreshold(Number(e.target.value))}
          >
            {ratingOptions.map((rating) => (
              <option key={rating} value={rating}>
                {rating}+
              </option>
            ))}
          </select>

          <button onClick={suggestMovie} className='suggest-btn'>Suggest</button>
        </div>

        {movie && (
          <div className='movie-display'>
            <img
              className='movie-poster'
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2 className='suggest-header'>{movie.title}</h2>
            <p className='rating'>Rating: {movie.vote_average.toFixed(1)}</p>
            <p className='description'>{movie.overview}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuggestScreen;
