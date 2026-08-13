const STORAGE_KEY =
    "netflix_my_list";



function getList() {

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );


    return data
        ? JSON.parse(data)
        : [];

}



function saveList(list) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(list)
    );

}



export function getMyList() {

    return getList();

}



export function isInMyList(
    movieId
) {

    return getList().some(
        movie =>
            movie.id === movieId
    );

}



export function addToMyList(
    movie
) {

    const list =
        getList();


    if (
        isInMyList(movie.id)
    ) {

        return false;

    }


    list.push(movie);


    saveList(list);


    return true;

}



export function removeFromMyList(
    movieId
) {

    const updated =
        getList().filter(
            movie =>
                movie.id !== movieId
        );


    saveList(updated);

}



export function toggleMyList(
    movie
) {

    if (
        isInMyList(movie.id)
    ) {

        removeFromMyList(
            movie.id
        );

        return false;

    }


    addToMyList(movie);

    return true;

}