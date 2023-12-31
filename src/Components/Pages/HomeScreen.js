import React, { useEffect, useState, useRef } from "react";

import { getDataFromApi } from "./utils/HandleApi";
import "./css/Screen.css";
import "./css/SearchScreen.css";

function HomeScreen() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardModal, setCardModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [castDetails, setCastDetails] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    getDataFromApi(currentPage, (response) => {
      setData(response);
    });
  }, [currentPage]);

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = 100 / data.slice(0, 5).length;

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.slice(0, 5).length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.slice(0, 5).length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    setTimeout(() => {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const Card = ({ item }) => {
    return (
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
          {item.first_air_date && <p>{item.first_air_date.split("-")[0]}</p>}
          {item.release_date && <p>{item.release_date.split("-")[0]}</p>}
          <p className="media-type">{item.media_type}</p>
          {item.vote_average && <p>{item.vote_average.toFixed(1)} ★</p>}
        </div>
      </div>
    );
  };

  // Render the data in your component
  return (
    <div className="screen">
      <div className="header-image" style={{ height: "50%" }} ref={topRef}>
        <div className="slider-container">
          <div
            className="slider"
            style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
          >
            {data.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="slide"
                style={{ width: `${slideWidth}%` }}
              >
                <div
                  className="slide-image"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="header-content">
                    <h2>{item.title || item.name}</h2>
                    <h1>{item.vote_average.toFixed(1)}⭐</h1>
                    <p>{item.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button className="prev-btn" onClick={prevSlide}>
              &lt;
            </button>
            <button className="next-btn" onClick={nextSlide}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      <div className="card-container">
        <h1>Trending</h1>
        <div className="cards">
          {data
            .filter((item) => item.poster_path && item.backdrop_path)
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
        </div>
        <div className="page-navigation">
          <button
            className="page-nav-btn"
            onClick={goToPrevPage}
            disabled={currentPage === 0}
          >
            Prev Page
          </button>
          <button
            className="page-nav-btn"
            onClick={goToNextPage}
            disabled={currentPage === 100}
          >
            Next Page
          </button>
        </div>
      </div>

      {cardModal && <div className="overlay"></div>}
      {cardModal && (
        <div className="modal">
          <div className="ss-search-item">
            <div className="ss-header">
              <h2 className="ss-title">{movieDetails.title}</h2>
              <button className="ss-close-btn" onClick={handleCardModalClose}>
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
                  {" "}
                  <span>Overview:</span> {movieDetails.overview}
                </p>
                <p className="ss-genres">
                  <span>Genres:</span>
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
  );
}

export default HomeScreen;
