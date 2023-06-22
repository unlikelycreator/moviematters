import axios from 'axios';

export const getDataFromApi = (callback) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzI1YmEyMGJlYmY2ZDJjZDNlNmE1NmYxMmY0NWFiYyIsInN1YiI6IjY0OTFiYTM2MjYzNDYyMDBjYTFiZDE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2S_p3JDkD69zLbW1_GD9BZuTvtR6xH3jFT27BNpttk',
    },
  };

  axios
    .get('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then((response) => {
      // Process the response data
      const data = response.data.results;
      console.log(data)
      // Pass the data to the callback function
      if (typeof callback === 'function') {
        callback(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
