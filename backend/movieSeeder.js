import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const movies = [
  {
    title: 'John Wick',
    description: 'An ex-hitman comes out of retirement.',
    category: 'Hollywood',
    language: 'English',
    genres: ['Action', 'Thriller'],
    ageRestriction: 18,
    releaseYear: 2014,
    thumbnail: 'https://i.ibb.co/zx4Q9Db/john-wick.jpg',
    videoUrl: 'https://www.youtube.com/embed/2AUmvWm5ZDQ',
  },
  {
    title: '3 Idiots',
    description: 'Three students navigate life and education in India.',
    category: 'Bollywood',
    language: 'Hindi',
    genres: ['Drama', 'Comedy'],
    ageRestriction: 13,
    releaseYear: 2009,
    thumbnail: 'https://i.ibb.co/xD5nCSp/3-idiots.jpg',
    videoUrl: 'https://www.youtube.com/embed/K0eDlFX9GMc',
  },
  {
    title: 'Bahubali',
    description: 'A historical epic of kings, wars, and revenge.',
    category: 'South Indian',
    language: 'Telugu',
    genres: ['Action', 'Fantasy'],
    ageRestriction: 16,
    releaseYear: 2015,
    thumbnail: 'https://i.ibb.co/vJdq0Pp/bahubali.jpg',
    videoUrl: 'https://www.youtube.com/embed/sOEg_YZQsTI',
  },
  {
    title: 'Shutter Island',
    description: 'A U.S. Marshal investigates a disappearance on an eerie island.',
    category: 'Hollywood',
    language: 'English',
    genres: ['Mystery', 'Thriller'],
    ageRestriction: 17,
    releaseYear: 2010,
    thumbnail: 'https://i.ibb.co/gjKr9DM/shutter-island.jpg',
    videoUrl: 'https://www.youtube.com/embed/5iaYLCiq5RM',
  },
  {
    title: 'Andhadhun',
    description: 'A blind pianist becomes embroiled in a series of murders.',
    category: 'Bollywood',
    language: 'Hindi',
    genres: ['Crime', 'Thriller'],
    ageRestriction: 18,
    releaseYear: 2018,
    thumbnail: 'https://i.ibb.co/1zPQdrf/andhadhun.jpg',
    videoUrl: 'https://www.youtube.com/embed/2iVYI99VGaw',
  },
  {
    title: 'Inception',
    description: 'A skilled thief steals secrets through dream invasion.',
    category: 'Sci-Fi',
    language: 'English',
    genres: ['Sci-Fi', 'Thriller'],
    ageRestriction: 14,
    releaseYear: 2010,
    thumbnail: 'https://i.ibb.co/kX8rhFn/inception.jpg',
    videoUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
  },
  {
    title: 'Avengers',
    description: 'Earth’s mightiest heroes assemble to fight global threats.',
    category: 'Action',
    language: 'English',
    genres: ['Action', 'Superhero'],
    ageRestriction: 13,
    releaseYear: 2012,
    thumbnail: 'https://i.ibb.co/F0BD76p/avengers.jpg',
    videoUrl: 'https://www.youtube.com/embed/eOrNdBpGMv8',
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces the Joker in Gotham’s darkest hour.',
    category: 'Action',
    language: 'English',
    genres: ['Action', 'Crime'],
    ageRestriction: 16,
    releaseYear: 2008,
    thumbnail: 'https://i.ibb.co/zGJPctT/dark-knight.jpg',
    videoUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
  },
  {
    title: 'The Hangover',
    description: 'Three buddies lose their friend after a wild Vegas night.',
    category: 'Comedy',
    language: 'English',
    genres: ['Comedy'],
    ageRestriction: 18,
    releaseYear: 2009,
    thumbnail: 'https://i.ibb.co/SNNx8fB/hangover.jpg',
    videoUrl: 'https://www.youtube.com/embed/tcdUhdOlz9M',
  },
  {
    title: 'Yeh Jawaani Hai Deewani',
    description: 'A story of love, travel, and self-discovery.',
    category: 'Bollywood',
    language: 'Hindi',
    genres: ['Romance', 'Drama'],
    ageRestriction: 13,
    releaseYear: 2013,
    thumbnail: 'https://i.ibb.co/LhHR6x1/yjhd.jpg',
    videoUrl: 'https://www.youtube.com/embed/Rbp2XUSeUNE',
  },
  {
    title: 'Titanic',
    description: 'A love story set during the tragic sinking of the Titanic.',
    category: 'Romance',
    language: 'English',
    genres: ['Romance', 'Drama'],
    ageRestriction: 13,
    releaseYear: 1997,
    thumbnail: 'https://i.ibb.co/fn8LG6c/titanic.jpg',
    videoUrl: 'https://www.youtube.com/embed/kVrqfYjkTdQ',
  },
  {
    title: 'Drishyam',
    description: 'A man goes to great lengths to protect his family.',
    category: 'Thriller',
    language: 'Hindi',
    genres: ['Thriller', 'Crime'],
    ageRestriction: 16,
    releaseYear: 2015,
    thumbnail: 'https://i.ibb.co/vVV2ps8/drishyam.jpg',
    videoUrl: 'https://www.youtube.com/embed/AuuX2j14NBg',
  },
  {
    title: 'Zindagi Na Milegi Dobara',
    description: 'Three friends rediscover life on a road trip in Spain.',
    category: 'Drama',
    language: 'Hindi',
    genres: ['Adventure', 'Drama'],
    ageRestriction: 12,
    releaseYear: 2011,
    thumbnail: 'https://i.ibb.co/qkDr6VZ/znmd.jpg',
    videoUrl: 'https://www.youtube.com/embed/FJrpcDgC3zU',
  },
  {
    title: 'Queen',
    description: 'A shy girl finds herself on a solo honeymoon trip.',
    category: 'Bollywood',
    language: 'Hindi',
    genres: ['Drama', 'Comedy'],
    ageRestriction: 13,
    releaseYear: 2014,
    thumbnail: 'https://i.ibb.co/JQczYHn/queen.jpg',
    videoUrl: 'https://www.youtube.com/embed/KGC6vl3lzf0',
  },
  {
    title: 'Dangal',
    description: 'A former wrestler trains his daughters to become champions.',
    category: 'Bollywood',
    language: 'Hindi',
    genres: ['Sports', 'Drama'],
    ageRestriction: 12,
    releaseYear: 2016,
    thumbnail: 'https://i.ibb.co/b6jFY9Y/dangal.jpg',
    videoUrl: 'https://www.youtube.com/embed/x_7YlGv9u1g',
  },
  {
    title: 'RRR',
    description: 'Two legendary revolutionaries and their journey far from home.',
    category: 'South Indian',
    language: 'Telugu',
    genres: ['Action', 'Drama'],
    ageRestriction: 16,
    releaseYear: 2022,
    thumbnail: 'https://i.ibb.co/xq3bBXj/rrr.jpg',
    videoUrl: 'https://www.youtube.com/embed/f_vbAtFSEc0',
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space.',
    category: 'Sci-Fi',
    language: 'English',
    genres: ['Sci-Fi', 'Drama'],
    ageRestriction: 13,
    releaseYear: 2014,
    thumbnail: 'https://i.ibb.co/hRvB9Vj/interstellar.jpg',
    videoUrl: 'https://www.youtube.com/embed/60h6lpnSgck',
  },
  {
    title: 'Chhichhore',
    description: 'A tragic accident brings a group of friends together.',
    category: 'Bollywood',
    language: 'Hindi',
    genres: ['Drama', 'Comedy'],
    ageRestriction: 12,
    releaseYear: 2019,
    thumbnail: 'https://i.ibb.co/DL6pZ4f/chhichhore.jpg',
    videoUrl: 'https://www.youtube.com/embed/tsxemFX0a7k',
  },
  {
    title: 'Pushpa',
    description: 'A lorry driver rises in the world of red sandalwood smuggling.',
    category: 'South Indian',
    language: 'Telugu',
    genres: ['Action', 'Crime'],
    ageRestriction: 17,
    releaseYear: 2021,
    thumbnail: 'https://i.ibb.co/3yZYQwM/pushpa.jpg',
    videoUrl: 'https://www.youtube.com/embed/Q1NKMPhP8PY',
  },
  {
    title: 'Spirited Away',
    description: 'A girl enters a world of spirits and gods.',
    category: 'Anime',
    language: 'Japanese',
    genres: ['Animation', 'Fantasy'],
    ageRestriction: 10,
    releaseYear: 2001,
    thumbnail: 'https://i.ibb.co/mFD3TpG/spirited-away.jpg',
    videoUrl: 'https://www.youtube.com/embed/ByXuk9QqQkk',
  },
];

const seedMovies = async () => {
  try {
    await Movie.deleteMany();
    await Movie.insertMany(movies);
    console.log('✅ Movies seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding movies:', err);
    process.exit(1);
  }
};

seedMovies();
