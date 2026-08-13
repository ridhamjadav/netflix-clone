import { movies } from "../data/movies.js";


export function searchMovies(query) {

    query =
        query.trim().toLowerCase();


    if (!query) {

        return [];

    }


    return movies.filter(movie => {

        return (

            movie.title
                .toLowerCase()
                .includes(query)

            ||

            movie.genre
                .toLowerCase()
                .includes(query)

        );

    });

}