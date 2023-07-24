import axios from "axios";

const Base_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGM3NDNjZmY2MjFjYzc0ZDdhOGZjMTQyNTI3M2FkNiIsInN1YiI6IjY0OWE5OWQwZDM1ZGVhMDEyYzE2ZTRhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPSEUkCYwqmboCGJ6Jk0_4pFThZvjpYguMnyGxwNcFE";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(Base_URL + url, { headers, params });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { fetchDataFromApi };
