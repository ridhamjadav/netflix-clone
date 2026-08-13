export function initializeSlider() {

    const movieList =
        document.getElementById("movieList");

    const leftButton =
        document.getElementById("sliderLeft");

    const rightButton =
        document.getElementById("sliderRight");


    if (!movieList) return;


    rightButton.addEventListener(
        "click",
        () => {

            movieList.scrollBy({

                left: 600,

                behavior: "smooth"

            });

        }
    );


    leftButton.addEventListener(
        "click",
        () => {

            movieList.scrollBy({

                left: -600,

                behavior: "smooth"

            });

        }
    );

}