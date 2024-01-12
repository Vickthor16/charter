
"use client";

import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import '../styles/global.css' 

interface Movie  {
  id: string;
  title: string;
  genres: string[];
};
 
interface MovieDetail {
 id: string;
 title: string;
 description: string;
 duration: string;
 genres: string[];
 releaseDate: string;
 releaseYear: string;
};
 
const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://code-challenge.spectrumtoolbox.com/api/movies', {
          headers: {
            'Authorization': 'Api-Key q3MNxtfep8Gt'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setMovies(result.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
 
    fetchData();
  }, []);
 
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
 
  const handleCardClick = async (movieId: string) => {
    setSelectedMovieId(movieId);
    setShowModal(true);
 
    try {
      const response = await fetch(`https://code-challenge.spectrumtoolbox.com/api/movies/${movieId}`, {
        headers: {
          'Authorization': 'Api-Key q3MNxtfep8Gt'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const details = await response.json();

     
      setMovieDetails(details.data);

    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };
 
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search Movies"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={selectedGenre} onChange={handleGenreChange}>
        {genres.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      
      <MovieList movies={filteredMovies} onCardClick={handleCardClick} />
      <MovieModal show={showModal} onClose={() => setShowModal(false)} movieId={movieDetails?.id}>
        {movieDetails && (
          <div>
            <h2>Title: {movieDetails.title}</h2>
            <h2>Description: {movieDetails.description}</h2>
            <h2>Duration: {movieDetails.duration}</h2>
            <h2>Genres: {movieDetails.genres}</h2>
            <h2>Release Date: {movieDetails.releaseDate}</h2>
            <h2>Year: {movieDetails.releaseYear}</h2>
          </div>
        )}
      </MovieModal>
    </div>
  );
};
 
export default Home;