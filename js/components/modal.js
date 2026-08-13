export function openMovieModal(movie) {

    const modal =
        document.getElementById(
            "movieModal"
        );


    modal.innerHTML = `

        <div class="modal-content">

            <button
                class="modal-close"
                id="closeModal">

                ×

            </button>

            <img
                src="${movie.image}"
                alt="${movie.title}"
            >

            <div class="modal-info">

                <h2>
                    ${movie.title}
                </h2>

                <div class="movie-meta">

                    ⭐ ${movie.rating}

                    <span>
                        ${movie.year}
                    </span>

                    <span>
                        ${movie.duration}
                    </span>

                </div>

                <p>
                    ${movie.description}
                </p>

                <button
                    class="play-button">

                    ▶ Play

                </button>

                <button
                    class="list-button">

                    + My List

                </button>

            </div>

        </div>

    `;


    modal.classList.add("active");


    document
        .getElementById("closeModal")
        .addEventListener(
            "click",
            closeMovieModal
        );

}


export function closeMovieModal() {

    const modal =
        document.getElementById(
            "movieModal"
        );

    modal.classList.remove("active");

}