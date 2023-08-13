import axios from "axios";

export const getDataFromApi = (page, callback) => {
  const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIwZmY2Mzk1Yjk0MzJkZGY3NGI3NTFkZTMxYTNhNSIsInN1YiI6IjYxYjU4NjViOTA3ZjI2MDA0MDFjNzQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ST2cDPGD4SDET5RM3eFjmFyfvfYE9SSoW3ErGFDJnmA",
    },
  };

  axios
    .get(url, options)
    .then((response) => {
      const data = response.data.results;
      if (typeof callback === "function") {
        callback(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
