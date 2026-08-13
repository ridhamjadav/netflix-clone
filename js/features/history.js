const HISTORY_KEY =
    "netflix_watch_history";



export function addToHistory(
    movie
) {

    const data =
        localStorage.getItem(
            HISTORY_KEY
        );


    let history =
        data
            ? JSON.parse(data)
            : [];


    history =
        history.filter(
            item =>
                item.id !== movie.id
        );


    history.unshift(movie);


    history =
        history.slice(
            0,
            10
        );


    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

}



export function getHistory() {

    const data =
        localStorage.getItem(
            HISTORY_KEY
        );


    return data
        ? JSON.parse(data)
        : [];

}