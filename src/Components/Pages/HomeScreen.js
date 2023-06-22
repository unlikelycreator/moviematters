import React, { useEffect, useState } from "react";
import { getDataFromApi } from "./utils/HandleApi";
import "./css/Screen.css";
import Slider from "react-slick";

function HomeScreen() {
  const [data, setData] = useState([]);


  useEffect(() => {
    getDataFromApi((response) => {
      setData(response);
    });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = 100 / data.slice(0, 5).length;

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.slice(0, 5).length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.slice(0, 5).length - 1 ? 0 : prevIndex + 1));
  };
  const Card = ({ item }) => {

    return (
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title || item.name}
        />
        <h3>{item.title || item.name}</h3>
        <div className="card-footer">
          <p>{(item.first_air_date || item.release_date).split('-')[0]}</p>
          <p className="media-type">{item.media_type}</p>
          <p>{item.vote_average.toFixed(1)}⭐</p>
        </div>
      </div>
    );
  };
  // Render the data in your component
  return (
    <div className="screen">
      <div className="header-image" style={{ height: "50%" }}>
        <div className="slider-container">
          <div className="slider" style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}>
            {data.slice(0, 5).map((item, index) => (
              <div key={index} className="slide" style={{ width: `${slideWidth}%` }}>
                <div
                  className="slide-image"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="header-content">
                    {currentIndex === index && (
                      <>
                        <h2>{item.title || item.name}</h2>
                        <p>{item.overview}</p>
                      </>
                    )}
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
        {data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
