import React from 'react';
import Card from './MovieCard';

interface Movie  {
    id: string;
    title: string;
    genres: string[];
};

interface MovieListProps  {
    movies: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div>
            {movies.map(movie => (
                <Card key={movie.id} movieId={movie.id} title={movie.title} genres={movie.genres} />
            ))}
        </div>
    );
};

export default MovieList;