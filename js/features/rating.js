import {
    saveData,
    getData
} from "../utils/storage.js";


const RATING_KEY =
    "netflix_ratings";


export function rateMovie(
    movieId,
    rating
) {

    const ratings =
        getData(
            RATING_KEY,
            {}
        );


    ratings[movieId] = rating;


    saveData(
        RATING_KEY,
        ratings
    );

}


export function getMovieRating(
    movieId
) {

    const ratings =
        getData(
            RATING_KEY,
            {}
        );


    return ratings[movieId] || 0;

}