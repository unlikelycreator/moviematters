import React, { useEffect, useState } from "react";
import { getDataFromApi } from "./utils/HandleApi";
import "./css/Screen.css";


import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function HomeScreen() {
  const [data, setData] = useState([]);


  useEffect(() => {
    getDataFromApi((response) => {
      setData(response);
    });
  }, []);


  const Card = ({ item }) => {
    const votePercentage = (item.vote_average / 10) * 100;
    const getColorStyles = () => {
      // Customize the color based on the vote percentage
      if (votePercentage >= 70) {
        return {
          textColor: '#ffffff', // Text color
          pathColor: '#29a329', // Progress bar color
          trailColor: '#e4e4e4', // Background color
        };
      } else if (votePercentage >= 40) {
        return {
          textColor: '#ffffff',
          pathColor: '#f3d415',
          trailColor: '#e4e4e4',
        };
      } else {
        return {
          textColor: '#ffffff',
          pathColor: '#e60000',
          trailColor: '#e4e4e4',
        };
      }
    };
  
    const colorStyles = getColorStyles();
    
    return (
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title || item.name}
        />
        <h3>{item.title || item.name}</h3>
        <div className="card-footer">
          <span>{item.media_type}</span>
          <CircularProgressbar className="rating-bar" value={votePercentage} text={`${item.vote_average.toFixed(2)}%`}  styles={buildStyles({
              textSize: '25px',
              pathTransitionDuration: 0.6, // Animation duration
              ...colorStyles, // Apply the custom color styles
            })} />
        </div>
      </div>
    );
  };
  // Render the data in your component
  return (
    <div className="screen">
      <div className="header-image" style={{ height: "50%" }}>
        {data.length > 0 && (
          <div
            className="backdrop-image"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${data[0].backdrop_path})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="header-content">
              <h2>{data[0].title || data[0].name}</h2>
              <p>{data[0].overview}</p>
            </div>
          </div>
        )}
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
