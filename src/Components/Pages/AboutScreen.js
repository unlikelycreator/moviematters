import React from 'react';
import './css/AboutScreen.css';

function AboutScreen() {
  return (
    <div className='screen'>
      <div className='about-content'>
        <h1 className='title'>Welcome to Movie Matters</h1>
        <p className='description'>
          Movie Matters is your ultimate destination for discovering, exploring, and staying updated on the world of movies. Created by passionate movie enthusiasts, this platform is designed to provide you with the latest information, reviews, and insights into the cinematic universe.
        </p>
        <div className='features'>
          <div className='feature'>
            <h2 className='about-header'>Comprehensive Movie Database</h2>
            <p>Explore a vast collection of movies, TV shows, and more. Our rich database offers detailed information, trailers, cast details, and user ratings.</p>
          </div>
          <div className='feature'>
            <h2 className='about-header'>Stay Updated</h2>
            <p>Get ahead with upcoming movie releases, trending topics, and industry news. Our platform keeps you informed and entertained.</p>
          </div>
          <div className='feature'>
            <h2 className='about-header'>Engage with Community</h2>
            <p>Connect with other movie enthusiasts, share your thoughts, write reviews, and participate in discussions to dive deep into the cinematic experience.</p>
          </div>
        </div>
        <div className='attribution'>
          <p>Powered by the incredible data provided by <a href='https://www.themoviedb.org/' target='_blank' rel='noopener noreferrer'>The Movie Database (TMDb)</a>.</p>
          <p>Movie Matters is an open-source project released under the MIT License.</p>
        </div>
        <a
          href='hhttps://github.com/unlikelycreator/moviematters'
          target='_blank'
          rel='noopener noreferrer'
          className='github-button'>
          View on GitHub
        </a>
      </div>
      <a style={{color:'#545454', fontSize: '14px'}} href='hhttps://github.com/unlikelycreator'>Designed with <span style={{color: 'red'}}>❤</span> by unlikelycreator (Hritik Pawar)</a>
    </div>
  );
}

export default AboutScreen;
