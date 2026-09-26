import Movie from "./Movie";
import './MovieList.css';

function MovieList(props) {
    const { movies = [] } = props;

    return (
        <div className="movies">
            {
                movies.length ? movies.map(movie => (
                    <Movie key={movie.imdbID} {...movie} />
                )) : <h3>По вашему запросу ничего не найдено</h3>
            }
        </div>
    )
}

export default MovieList;