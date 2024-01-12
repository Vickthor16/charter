import React from 'react';
import Card from './MovieCard';
import '../../styles/global.css' 

interface Movie {
    id: string;
    title: string;
    genres: string[];
};

interface MovieListProps {
    movies: Movie[];
    onCardClick: (movieId: string) => void;
};

const MovieList: React.FC<MovieListProps> = ({ movies, onCardClick }) => {
    return (
        <div className="movieListContainer">
            {movies.map(movie => (
                <div className="cardContainer" key={movie.id}>
                <Card key={movie.id} movieId={movie.id} title={movie.title} genres={movie.genres} onClick={onCardClick} />
                </div>
            ))}
        </div>
    );
};

export default MovieList;