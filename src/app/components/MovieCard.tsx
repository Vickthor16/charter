// components/Card.tsx

import React from 'react';

interface MovieCardProps  {
  movieId: string;
  title: string;
  genres: string[];
  onClick: (movieId: string) => void
};

const MovieCard: React.FC<MovieCardProps> = ({ movieId, title, genres, onClick }) => {
  const posterPath = `/images/moviePosterImages/${movieId}.jpeg`;
  const defaultImagePath = '/images/moviePosterImages/defaultImage.jpeg';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImagePath;
  };

  return (
    <div onClick={() => onClick(movieId)}>
      <img
        src={posterPath}
        alt={title}
        onError={handleImageError}
      />
      <div>
        <h3>{title}</h3>
        <ul>
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieCard;