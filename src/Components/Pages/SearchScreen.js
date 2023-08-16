import React, { useState, useEffect, useRef } from "react";
import "./css/Screen.css";
import "./css/HomeScreen.css";
function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [upcomingmovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [cardModal, setCardModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [castDetails, setCastDetails] = useState(null);
  const topRef = useRef(null);

  const fetchMovieDetails = async (movieId) => {
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIwZmY2Mzk1Yjk0MzJkZGY3NGI3NTFkZTMxYTNhNSIsInN1YiI6IjYxYjU4NjViOTA3ZjI2MDA0MDFjNzQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ST2cDPGD4SDET5RM3eFjmFyfvfYE9SSoW3ErGFDJnmA",
      },
    };

    try {
      const [movieResponse, creditsResponse] = await Promise.all([
        fetch(movieUrl, options),
        fetch(creditsUrl, options),
      ]);

      if (movieResponse.ok && creditsResponse.ok) {
        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        setMovieDetails(movieData);
        setCastDetails(creditsData.cast);
        setCardModal(true);
      } else {
        console.error("Error fetching movie details or cast details");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      const fetchTopMovies = async () => {
        const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
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
      const fetchUpcomingMovies = async () => {
        const url =
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
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
          setUpcomingMovies(data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const fetchPopularMovies = async () => {
        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
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
          setPopularMovies(data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchTopMovies();
      fetchUpcomingMovies();
      fetchPopularMovies();
    }
  }, [searchQuery]);

  return (
    <div className="screen">
      <div className="input-container" ref={topRef}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movies and Tv..."
        />
      </div>

    
      <div className="card-container">
        {!searchQuery ? <h1>Upcoming Movies</h1> : <h1>Search Results</h1>}
        <div className="card-scroller">
          {upcomingmovies
            .filter((item) => item.poster_path)
            .map((item) => (
              <div
                className="scroll-card"
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
                  {item.release_date && (
                    <p>{item.release_date.split("-")[0]}</p>
                  )}
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
                  <button
                    className="ss-close-btn"
                    onClick={handleCardModalClose}
                  >
                    &#10006;
                  </button>
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
                    <p className="ss-release-date">
                      <span>Release Date:</span> {movieDetails.release_date}
                    </p>
                    <p className="ss-overview">
                      <span>Overview:</span> {movieDetails.overview}
                    </p>
                    <p className="ss-genres">
                      <span>Genres:</span>{" "}
                      {movieDetails.genres
                        .map((genre) => genre.name)
                        .join(", ")}
                    </p>
                    <p className="ss-production-companies">
                      <span>Production Companies:</span>{" "}
                      {movieDetails.production_companies
                        .map((company) => company.name)
                        .join(", ")}
                    </p>
                  </main>
                </div>
                <div className="cast-details">
                  <h3>Cast</h3>
                  <div className="cast-list">
                    {castDetails
                      .filter((cast) => cast.profile_path) // Filter out cast members without a profile_path
                      .map((cast) => (
                        <div className="cast-item" key={cast.id}>
                          <img
                            src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                            alt={cast.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                          <p className="cast-name">{cast.name}</p>
                          <p className="cast-character">{cast.character}</p>
                        </div>
                      ))}
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card-container">
        {!searchQuery ? <h1>Popular Movies</h1> : <h1>Search Results</h1>}
        <div className="card-scroller">
          {popularMovies
            .filter((item) => item.poster_path)
            .map((item) => (
              <div
                className="scroll-card"
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
                  {item.release_date && (
                    <p>{item.release_date.split("-")[0]}</p>
                  )}
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
                  <button
                    className="ss-close-btn"
                    onClick={handleCardModalClose}
                  >
                    &#10006;
                  </button>
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
                    <p className="ss-release-date">
                      <span>Release Date:</span> {movieDetails.release_date}
                    </p>
                    <p className="ss-overview">
                      <span>Overview:</span> {movieDetails.overview}
                    </p>
                    <p className="ss-genres">
                      <span>Genres:</span>{" "}
                      {movieDetails.genres
                        .map((genre) => genre.name)
                        .join(", ")}
                    </p>
                    <p className="ss-production-companies">
                      <span>Production Companies:</span>{" "}
                      {movieDetails.production_companies
                        .map((company) => company.name)
                        .join(", ")}
                    </p>
                  </main>
                </div>
                <div className="cast-details">
                  <h3>Cast</h3>
                  <div className="cast-list">
                    {castDetails
                      .filter((cast) => cast.profile_path) // Filter out cast members without a profile_path
                      .map((cast) => (
                        <div className="cast-item" key={cast.id}>
                          <img
                            src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                            alt={cast.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                          <p className="cast-name">{cast.name}</p>
                          <p className="cast-character">{cast.character}</p>
                        </div>
                      ))}
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card-container">
        {!searchQuery ? <h1>Top Rated</h1> : <h1>Search Results</h1>}
        <div className="card-scroller">
          {movies
            .filter((item) => item.poster_path)
            .map((item) => (
              <div
                className="scroll-card"
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
                  {item.release_date && (
                    <p>{item.release_date.split("-")[0]}</p>
                  )}
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
                  <button
                    className="ss-close-btn"
                    onClick={handleCardModalClose}
                  >
                    &#10006;
                  </button>
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
                    <p className="ss-release-date">
                      <span>Release Date:</span> {movieDetails.release_date}
                    </p>
                    <p className="ss-overview">
                      <span>Overview:</span> {movieDetails.overview}
                    </p>
                    <p className="ss-genres">
                      <span>Genres:</span>{" "}
                      {movieDetails.genres
                        .map((genre) => genre.name)
                        .join(", ")}
                    </p>
                    <p className="ss-production-companies">
                      <span>Production Companies:</span>{" "}
                      {movieDetails.production_companies
                        .map((company) => company.name)
                        .join(", ")}
                    </p>
                  </main>
                </div>
                <div className="cast-details">
                  <h3>Cast</h3>
                  <div className="cast-list">
                    {castDetails
                      .filter((cast) => cast.profile_path) // Filter out cast members without a profile_path
                      .map((cast) => (
                        <div className="cast-item" key={cast.id}>
                          <img
                            src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                            alt={cast.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                          <p className="cast-name">{cast.name}</p>
                          <p className="cast-character">{cast.character}</p>
                        </div>
                      ))}
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
