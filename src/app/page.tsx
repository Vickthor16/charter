
"use client";

import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';

type Movie = {
  id: string;
  title: string;
  genres: string[];
};

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

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

        // Extracting unique genres
        const allGenres = result.data.flatMap(movie => movie.genres);
        const uniqueGenres = Array.from(new Set(allGenres));
        setGenres(['All', ...uniqueGenres]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === 'All' || movie.genres.includes(selectedGenre))
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
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default Home;