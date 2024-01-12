import React, { useState } from 'react';

interface MovieModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  movieId?: string;
};

  const MovieModal: React.FC<MovieModalProps> = ({ show, onClose, children, movieId }) => {
  const [imageError, setImageError] = useState(false);
  const defaultImagePath = '/images/movieHeroImages/defaultImage.jpeg';
  const heroPath = movieId ? `/images/movieHeroImages/${movieId}.jpeg` : defaultImagePath;

  if (!show) {
    return null;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <img
          src={imageError ? defaultImagePath : heroPath}
          alt="Movie Poster"
          onError={handleImageError}
        />
        {children}
      </div>
    </div>
  );
};

export default MovieModal;