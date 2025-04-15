import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import movieService from '../../services/movieService'; // Import the movie service

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', language: '' });
  const [editingMovieId, setEditingMovieId] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch all movies from the backend
  const fetchMovies = async () => {
    const res = await movieService.getAllMovies();
    setMovies(res);
  };

  const handleOpen = (movie = null) => {
    if (movie) {
      setEditingMovieId(movie._id);
      setFormData({ title: movie.title, description: movie.description, language: movie.language });
    } else {
      setEditingMovieId(null);
      setFormData({ title: '', description: '', language: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingMovieId) {
        // Update existing movie
        await movieService.editMovie(editingMovieId, formData);
      } else {
        // Add new movie
        await movieService.addMovie(formData);
      }
      fetchMovies(); // Fetch movies after adding/editing
      handleClose();
    } catch (err) {
      console.error('Error saving movie:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await movieService.deleteMovie(id);
      fetchMovies(); // Fetch movies after deletion
    } catch (err) {
      console.error('Error deleting movie:', err);
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies when the component mounts
  }, []);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Manage Movies</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Movie</Button>
        <Grid container spacing={2} mt={2}>
          {movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} key={movie._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">{movie.description}</Typography>
                  <Typography variant="caption">Language: {movie.language}</Typography>
                  <Button variant="outlined" sx={{ mt: 1, mr: 1 }} onClick={() => handleOpen(movie)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(movie._id)}>Delete</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingMovieId ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth sx={{ mt: 1 }} />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth sx={{ mt: 2 }} multiline />
          <TextField label="Language" name="language" value={formData.language} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editingMovieId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ManageMovies;
