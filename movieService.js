import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this if your backend uses a different URL or port
});

// Get all movies
export const getAllMovies = async () => {
  const response = await API.get('/movies'); // make sure your backend route is /api/movies
  return response.data;
};

// Add a new movie (Admin only)
export const addMovie = async (movieData) => {
  const response = await API.post('/movies', movieData); // This should trigger the admin route for adding a movie
  return response.data;
};

// Edit an existing movie (Admin only)
export const editMovie = async (id, updatedData) => {
  const response = await API.put(`/movies/${id}`, updatedData); // This should trigger the admin route for editing a movie
  return response.data;
};

// Delete a movie (Admin only)
export const deleteMovie = async (id) => {
  const response = await API.delete(`/movies/${id}`); // This should trigger the admin route for deleting a movie
  return response.data;
};

const movieService = {
  getAllMovies,
  addMovie,
  editMovie,
  deleteMovie,
};

export default movieService;
