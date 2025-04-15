import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Snackbar,
  Modal,
  Rating,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import johnWickImage from '../assets/images/Jhonwick.jpg';
import threeIdiotsImage from '../assets/images/3 idiots.jpg';
import bahubaliImage from '../assets/images/bahubali.jpg';
import shutterIslandImage from '../assets/images/ShutterIsland.jpg';

import andhadhunImage from '../assets/images/Andhadhun.jpg';
import inceptionImage from '../assets/images/inception.jpg'
import avengersImage from '../assets/images/avengers.jpg';
import darkKnightImage from '../assets/images/The dark knight.jpg';
import hangoverImage from '../assets/images/Hangovere.jpg';

import yehJawaniImage from '../assets/images/yejawani.jpg';
import titanicImage from '../assets/images/titanic.jpg';
import drishyamImage from '../assets/images/drishyam.jpg';
import zindagiImage from '../assets/images/zindagi.jpg';
import queenImage from '../assets/images/queen.jpg';
import dangalImage from '../assets/images/dangal.jpg';

const movies = [
  { title: "John Wick", genre: "action", url: "https://www.youtube.com/embed/2AUmvWm5ZDQ", imageUrl: johnWickImage },
  { title: "3 Idiots", genre: "comedy", url: "https://www.youtube.com/embed/K0eDlFX9GMc", imageUrl: threeIdiotsImage },
  { title: "Bahubali", genre: "drama", url: "https://www.youtube.com/embed/sOEg_YZQsTI", imageUrl: bahubaliImage },
  { title: "Shutter Island", genre: "thriller", url: "https://www.youtube.com/embed/5iaYLCiq5RM", imageUrl: shutterIslandImage },
  { title: "Andhadhun", genre: "thriller", url: "https://www.youtube.com/embed/2iVYI99VGaw", imageUrl: andhadhunImage },
  { title: "Inception", genre: "action", url: "https://www.youtube.com/embed/8hP9D6kZseM", imageUrl: inceptionImage },
  { title: "Avengers", genre: "action", url: "https://www.youtube.com/embed/eOrNdBpGMv8",imageUrl: avengersImage  },
  { title: "The Dark Knight", genre: "drama", url: "https://www.youtube.com/embed/EXeTwQWrcwY", imageUrl: darkKnightImage },
  { title: "The Hangover", genre: "comedy", url: "https://www.youtube.com/embed/tcdUhdOlz9M", imageUrl: hangoverImage },

  { title: "Yeh Jawaani Hai Deewani", genre: "romance", url: "https://www.youtube.com/embed/Rbp2XUSeUNE", imageUrl: yehJawaniImage },
  { title: "Titanic", genre: "romance", url: "https://www.youtube.com/embed/kVrqfYjkTdQ", imageUrl: titanicImage },
  { title: "Drishyam", genre: "thriller", url: "https://www.youtube.com/embed/7lpeq7wFqkI", imageUrl: drishyamImage },
  { title: "Zindagi Na Milegi Dobara", genre: "comedy", url: "https://www.youtube.com/embed/FJrpcDgC3zU", imageUrl: zindagiImage },
  { title: "Queen", genre: "comedy", url: "https://www.youtube.com/embed/KGC6vl3lzf0", imageUrl: queenImage },
  { title: "Dangal", genre: "drama", url: "https://www.youtube.com/embed/x_7YlGv9u1g", imageUrl: dangalImage },
];

export default function AllMovies() {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [visibleLikeDislike, setVisibleLikeDislike] = useState({});
  const [downloaded, setDownloaded] = useState({});
  const [downloadCount, setDownloadCount] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [ratings, setRatings] = useState({});
  const [movieDetailsVisible, setMovieDetailsVisible] = useState({});
  const [watchLater, setWatchLater] = useState({});
  const [temporaryRating, setTemporaryRating] = useState({}); // For temporary rating display
  const navigate = useNavigate();

  // Play Video Functionality
  const handlePlayVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedVideo(null);
  };

  // Like/Dislike Handling
  const handleLike = (title) => {
    setVisibleLikeDislike((prev) => ({ ...prev, [title]: "liked" }));
    setTimeout(() => setVisibleLikeDislike((prev) => ({ ...prev, [title]: false })), 3000);
  };

  const handleDislike = (title) => {
    setVisibleLikeDislike((prev) => ({ ...prev, [title]: "disliked" }));
    setTimeout(() => setVisibleLikeDislike((prev) => ({ ...prev, [title]: false })), 3000);
  };

  // Download Handling
  const handleDownload = (title) => {
    if (downloadCount >= 3) {
      setSnackbar({ open: true, message: "Download limit reached. Subscribe!" });
      return;
    }
    setDownloaded((prev) => ({ ...prev, [title]: true }));
    setDownloadCount((count) => count + 1);
    setSnackbar({ open: true, message: "Downloaded ✅" });
    setTimeout(() => {
      setDownloaded((prev) => ({ ...prev, [title]: false }));
    }, 3000);
  };

  // Navigate to User Dashboard
  const handleDashboardClick = () => navigate("/user/dashboard");

  // Movie Rating Handling with Temporary Rating Display
  const handleRatingChange = (movieTitle, newRating) => {
    setRatings((prev) => ({ ...prev, [movieTitle]: newRating }));
    setTemporaryRating((prev) => ({ ...prev, [movieTitle]: `${newRating}/5` }));
    setTimeout(() => {
      setTemporaryRating((prev) => ({ ...prev, [movieTitle]: "" }));
    }, 3000);
  };

  // Toggle Movie Details View
  const handleToggleDetails = (movieTitle) => {
    setMovieDetailsVisible((prev) => ({
      ...prev,
      [movieTitle]: !prev[movieTitle],
    }));
  };

  // Watch Later Handling
  const handleWatchLater = (movieTitle) => {
    setWatchLater((prev) => {
      const updatedWatchLater = { ...prev };
      updatedWatchLater[movieTitle] = !updatedWatchLater[movieTitle];
      return updatedWatchLater;
    });
    setSnackbar({
      open: true,
      message: watchLater[movieTitle] ? "Removed from Watch Later" : "Added to Watch Later",
    });
  };

  // Filtering Movies by Genre
  const filteredMovies = selectedGenre === "all" ? movies : movies.filter((m) => m.genre === selectedGenre);

  return (
    <Box sx={{ minHeight: "100vh", px: 3, py: 4, background: "#000", color: "#fff" }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        color="info"
        onClick={handleDashboardClick}
        sx={{
          position: "absolute",
          top: "30px",
          right: "30px",
          fontWeight: "bold",
          borderRadius: "20px",
          padding: "6px 20px",
          background: "red",
          color: "#fff",
          '&:hover': {
            background: "darkred",
          },
        }}
      >
        {"Back"}
      </Button>

      {/* Genre Buttons */}
      <Box mb={2}>
        {["all", "action", "comedy", "drama", "thriller", "romance"].map((genre) => (
          <Button
            key={genre}
            variant={selectedGenre === genre ? "contained" : "outlined"}
            color="primary"
            onClick={() => setSelectedGenre(genre)}
            sx={{
              mr: 1,
              mb: 1,
              borderRadius: "20px",
              backgroundColor: selectedGenre === genre ? "red" : "transparent",
              '&:hover': {
                backgroundColor: selectedGenre === genre ? "darkred" : "transparent",
              },
            }}
          >
            {genre.toUpperCase()}
          </Button>
        ))}
      </Box>

      {/* Movie Cards */}
      <Grid container spacing={3} mt={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.title}>
            <Card sx={{ maxWidth: 280, backgroundColor: "#222", boxShadow: "none" }}>
            <CardMedia
  component="img"
  height="250"
  image={movie.imageUrl || `https://via.placeholder.com/250x250?text=${movie.title}`} // Updated here
  alt={movie.title}
  sx={{ borderRadius: "10px" }}
/>

              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{movie.title}</Typography>
                {movieDetailsVisible[movie.title] && (
                  <Typography variant="body2">{movie.genre}</Typography>
                )}

                {/* Rating */}
                <Box>
                  <Rating
                    value={ratings[movie.title] || 0}
                    onChange={(e, newRating) => handleRatingChange(movie.title, newRating)}
                    sx={{ color: "yellow" }}
                  />
                  {temporaryRating[movie.title] && (
                    <Typography variant="caption" sx={{ color: "yellow", fontSize: "0.75rem" }}>
                      {temporaryRating[movie.title]}
                    </Typography>
                  )}
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: "center" }}>
                {/* Like Button */}
                <Tooltip title="Like">
                  <IconButton onClick={() => handleLike(movie.title)}>
                    <ThumbUpIcon sx={{ color: visibleLikeDislike[movie.title] === "liked" ? "green" : "grey" }} />
                  </IconButton>
                </Tooltip>

                {/* Dislike Button */}
                <Tooltip title="Dislike">
                  <IconButton onClick={() => handleDislike(movie.title)}>
                    <ThumbDownIcon sx={{ color: visibleLikeDislike[movie.title] === "disliked" ? "red" : "grey" }} />
                  </IconButton>
                </Tooltip>

                {/* Watch Later Button */}
                <Tooltip title="Watch Later">
                  <IconButton onClick={() => handleWatchLater(movie.title)}>
                    <WatchLaterIcon sx={{ color: watchLater[movie.title] ? "orange" : "grey" }} />
                  </IconButton>
                </Tooltip>

                {/* Download Button */}
                <Tooltip title="Download">
                  <IconButton onClick={() => handleDownload(movie.title)}>
                    <DownloadIcon sx={{ color: downloaded[movie.title] ? "blue" : "grey" }} />
                  </IconButton>
                </Tooltip>

                {/* Play Button */}
                <Tooltip title="Play">
                  <IconButton onClick={() => handlePlayVideo(movie.url)}>
                    <PlayCircleFilledWhiteIcon sx={{ color: "green" }} />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for Download Message */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      {/* Video Modal */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: 24,
        }}>
          <iframe
            width="560"
            height="315"
            src={selectedVideo}
            title="Movie Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Modal>
    </Box>
  );
}
