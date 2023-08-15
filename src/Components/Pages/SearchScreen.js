import React, { useState, useEffect } from "react";
import "./css/Screen.css";
import "./css/HomeScreen.css";
function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [cardModal, setCardModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const fetchMovieDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIwZmY2Mzk1Yjk0MzJkZGY3NGI3NTFkZTMxYTNhNSIsInN1YiI6IjYxYjU4NjViOTA3ZjI2MDA0MDFjNzQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ST2cDPGD4SDET5RM3eFjmFyfvfYE9SSoW3ErGFDJnmA",
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMovieDetails(data);
      } else {
        console.error("Error fetching movie details:", response.statusText);
      }
      setCardModal(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleCardModalClose = () => {
    setCardModal(false);
  };

  useEffect(() => {
    if (searchQuery) {
      const fetchMovies = async () => {
        const query = encodeURIComponent(searchQuery);
        const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIwZmY2Mzk1Yjk0MzJkZGY3NGI3NTFkZTMxYTNhNSIsInN1YiI6IjYxYjU4NjViOTA3ZjI2MDA0MDFjNzQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ST2cDPGD4SDET5RM3eFjmFyfvfYE9SSoW3ErGFDJnmA",
            },
          });

          const data = await response.json();
          console.log(data);
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchMovies();
    } else {
      const fetchMovies = async () => {
        const url =
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIwZmY2Mzk1Yjk0MzJkZGY3NGI3NTFkZTMxYTNhNSIsInN1YiI6IjYxYjU4NjViOTA3ZjI2MDA0MDFjNzQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ST2cDPGD4SDET5RM3eFjmFyfvfYE9SSoW3ErGFDJnmA",
            },
          });

          const data = await response.json();
          console.log(data);
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchMovies();
    }
  }, [searchQuery]);

  return (
    <div className="screen">
      <div className="input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movies and Tv..."
        />
      </div>

      {!searchQuery ? <h1>Top Rated</h1> : <h1>Search Results</h1>}
      <div className="cards">
        {movies
          .filter((item) => item.poster_path)
          .map((item) => (
            <div
              className="card"
              onClick={() => fetchMovieDetails(item.id)}
              key={item.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
              />
              <h3>{item.title || item.name}</h3>
              <div className="card-footer">
                {item.first_air_date && (
                  <p>{item.first_air_date.split("-")[0]}</p>
                )}
                {item.release_date && <p>{item.release_date.split("-")[0]}</p>}
                <p className="media-type">{item.media_type}</p>
                {item.vote_average && <p>{item.vote_average.toFixed(1)} ★</p>}
              </div>
            </div>
          ))}

        {cardModal && <div className="overlay"></div>}
        {cardModal && (
          <div className="modal">
            <div className="ss-search-item">
              <div className="ss-header">
                <h2 className="ss-title">{movieDetails.title}</h2>
                <p className="ss-release-date">
                  Release Date: {movieDetails.release_date}
                </p>
              </div>
              <div className="ss-content">
                <img
                  className="ss-poster"
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
                <main>
                  {" "}
                  <p className="ss-rating">
                    Rating: {movieDetails.vote_average.toFixed(1)} ★
                  </p>
                  <p className="ss-overview">
                    <span>Overview:</span> {movieDetails.overview}
                  </p>
                  <p className="ss-genres">
                    <span>Genres:</span>{" "}
                    {movieDetails.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p className="ss-production-companies">
                    <span>Production Companies:</span>{" "}
                    {movieDetails.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </p>
                </main>
              </div>
              <div className="ss-footer">
                <div className="button-container">
                  <a
                    className="ss-homepage"
                    href={movieDetails.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Homepage
                  </a>
                  <button
                    className="ss-homepage"
                    onClick={handleCardModalClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchScreen;
