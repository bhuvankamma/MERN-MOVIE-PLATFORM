// client/src/components/admin/ReviewModeration.jsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/admin/reviews', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setReviews(res.data);
  };

  const deleteReview = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/admin/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Review Moderation</Typography>
        <Grid container spacing={2}>
          {reviews.map((rev) => (
            <Grid item xs={12} key={rev._id}>
              <Card>
                <CardContent>
                  <Typography>User: {rev.user?.name}</Typography>
                  <Typography>Movie: {rev.movie?.title}</Typography>
                  <Typography>Comment: {rev.comment}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteReview(rev._id)}
                    sx={{ mt: 2 }}
                  >
                    Delete Review
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReviewModeration;
