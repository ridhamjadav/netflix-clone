import { movies }
from "./data/movies.js";

import { faqData }
from "./data/faq.js";

import {
    register,
    login,
    logout,
    getCurrentUser,
    isLoggedIn
}
from "./features/authentication.js";

import {
    getMyList,
    toggleMyList,
    isInMyList
}
from "./features/watchlist.js";

import {
    addToHistory,
    getHistory
}
from "./features/history.js";

import {
    showToast
}
from "./components/toast.js";



/* =========================================
   DOM READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);



/* =========================================
   INITIALIZE APP
========================================= */

function initializeApp() {

    renderMovies();

    renderFAQ();

    initializeSlider();

    initializeTheme();

    initializeAuthentication();

    initializeSearch();

    initializeEmailForms();

    initializeModal();

    renderMyList();

    renderContinueWatching();

}



/* =========================================
   MOVIE CARDS
========================================= */

function createMovieCard(movie) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "movie-card";


    card.innerHTML = `

        <div class="poster">

            <span class="netflix-n">
                N
            </span>

            <img
                src="${movie.image}"
                alt="${movie.title}"
                loading="lazy"
            >

            <span class="rank">
                ${movie.id}
            </span>

        </div>


        <h3>
            ${movie.title}
        </h3>


        <p>
            ${movie.genre}
            •
            ${movie.year}
        </p>

    `;


    card.addEventListener(
        "click",
        () => {

            openMovieModal(
                movie
            );

        }
    );


    return card;

}



function renderMovies() {

    const container =
        document.getElementById(
            "movieList"
        );


    if (!container) return;


    container.innerHTML = "";


    movies.forEach(
        movie => {

            container.appendChild(
                createMovieCard(
                    movie
                )
            );

        }
    );

}



/* =========================================
   MOVIE MODAL
========================================= */

function openMovieModal(movie) {

    const modal =
        document.getElementById(
            "movieModal"
        );


    const added =
        isInMyList(movie.id);


    modal.innerHTML = `

        <div class="modal-content">

            <button
                class="modal-close"
                id="closeMovieModal"
                type="button"
            >
                ×
            </button>


            <img
                class="modal-poster"
                src="${movie.image}"
                alt="${movie.title}"
            >


            <div class="modal-info">

                <h2>
                    ${movie.title}
                </h2>


                <div class="movie-meta">

                    <span>
                        ⭐ ${movie.rating}
                    </span>

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


                <div class="modal-buttons">

                    <button
                        class="play-button"
                        id="playMovie"
                        type="button"
                    >
                        ▶ Play
                    </button>


                    <button
                        class="list-button"
                        id="listMovie"
                        type="button"
                    >
                        ${added
                            ? "✓ My List"
                            : "+ My List"
                        }
                    </button>

                </div>

            </div>

        </div>

    `;


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    document
        .getElementById(
            "closeMovieModal"
        )
        .addEventListener(
            "click",
            closeMovieModal
        );


    document
        .getElementById(
            "playMovie"
        )
        .addEventListener(
            "click",
            () => {

                addToHistory(
                    movie
                );


                renderContinueWatching();


                closeMovieModal();


                showToast(
                    `${movie.title} added to Continue Watching`
                );

            }
        );


    document
        .getElementById(
            "listMovie"
        )
        .addEventListener(
            "click",
            event => {

                const result =
                    toggleMyList(
                        movie
                    );


                event.target.textContent =
                    result
                        ? "✓ My List"
                        : "+ My List";


                renderMyList();


                showToast(
                    result
                        ? "Added to My List"
                        : "Removed from My List"
                );

            }
        );

}



function closeMovieModal() {

    const modal =
        document.getElementById(
            "movieModal"
        );


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}



/* =========================================
   MODAL
========================================= */

function initializeModal() {

    const modal =
        document.getElementById(
            "movieModal"
        );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeMovieModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMovieModal();

            }

        }
    );

}



/* =========================================
   MY LIST
========================================= */

function renderMyList() {

    const section =
        document.getElementById(
            "myListSection"
        );


    const container =
        document.getElementById(
            "myList"
        );


    const list =
        getMyList();


    if (!list.length) {

        section.classList.remove(
            "visible"
        );

        return;

    }


    section.classList.add(
        "visible"
    );


    container.innerHTML = "";


    list.forEach(
        movie => {

            container.appendChild(
                createMovieCard(
                    movie
                )
            );

        }
    );

}



/* =========================================
   CONTINUE WATCHING
========================================= */

function renderContinueWatching() {

    const section =
        document.getElementById(
            "continueSection"
        );


    const container =
        document.getElementById(
            "continueList"
        );


    const history =
        getHistory();


    if (!history.length) {

        section.classList.remove(
            "visible"
        );

        return;

    }


    section.classList.add(
        "visible"
    );


    container.innerHTML = "";


    history.forEach(
        movie => {

            container.appendChild(
                createMovieCard(
                    movie
                )
            );

        }
    );

}



/* =========================================
   SLIDER
========================================= */

function initializeSlider() {

    const container =
        document.getElementById(
            "movieList"
        );


    const left =
        document.getElementById(
            "sliderLeft"
        );


    const right =
        document.getElementById(
            "sliderRight"
        );


    if (
        !container ||
        !left ||
        !right
    ) {

        return;

    }


    left.addEventListener(
        "click",
        () => {

            container.scrollBy({
                left: -600,
                behavior: "smooth"
            });

        }
    );


    right.addEventListener(
        "click",
        () => {

            container.scrollBy({
                left: 600,
                behavior: "smooth"
            });

        }
    );

}



/* =========================================
   FAQ
========================================= */

function renderFAQ() {

    const container =
        document.getElementById(
            "faqList"
        );


    container.innerHTML = "";


    faqData.forEach(
        item => {

            const faq =
                document.createElement(
                    "div"
                );


            faq.className =
                "faq-item";


            faq.innerHTML = `

                <button
                    class="faq-question"
                    type="button"
                >

                    <span>
                        ${item.question}
                    </span>

                    <span class="faq-icon">
                        +
                    </span>

                </button>


                <div class="faq-answer">

                    <p>
                        ${item.answer}
                    </p>

                </div>

            `;


            const button =
                faq.querySelector(
                    ".faq-question"
                );


            button.addEventListener(
                "click",
                () => {

                    faq.classList.toggle(
                        "active"
                    );

                }
            );


            container.appendChild(
                faq
            );

        }
    );

}



/* =========================================
   THEME
========================================= */

function initializeTheme() {

    const button =
        document.getElementById(
            "themeButton"
        );


    const saved =
        localStorage.getItem(
            "theme"
        );


    if (
        saved === "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );


        button.textContent =
            "🌙";

    } else {

        button.textContent =
            "☀️";

    }


    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const light =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "theme",
                light
                    ? "light"
                    : "dark"
            );


            button.textContent =
                light
                    ? "🌙"
                    : "☀️";

        }
    );

}



/* =========================================
   AUTHENTICATION
========================================= */

function initializeAuthentication() {

    const signInButton =
        document.getElementById(
            "signInButton"
        );


    const authModal =
        document.getElementById(
            "authModal"
        );


    const close =
        document.getElementById(
            "authClose"
        );


    signInButton.addEventListener(
        "click",
        () => {

            if (
                isLoggedIn()
            ) {

                toggleProfileMenu();

            } else {

                openLogin();

            }

        }
    );


    close.addEventListener(
        "click",
        closeAuth
    );


    authModal.addEventListener(
        "click",
        event => {

            if (
                event.target === authModal
            ) {

                closeAuth();

            }

        }
    );


    document
        .getElementById(
            "showSignup"
        )
        .addEventListener(
            "click",
            openSignup
        );


    document
        .getElementById(
            "showLogin"
        )
        .addEventListener(
            "click",
            openLogin
        );


    document
        .getElementById(
            "loginFormElement"
        )
        .addEventListener(
            "submit",
            handleLogin
        );


    document
        .getElementById(
            "signupFormElement"
        )
        .addEventListener(
            "submit",
            handleSignup
        );


    document
        .getElementById(
            "forgotPassword"
        )
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Password recovery is unavailable in this demo."
                );

            }
        );


    document
        .getElementById(
            "logoutButton"
        )
        .addEventListener(
            "click",
            handleLogout
        );


    document
        .getElementById(
            "profileMyList"
        )
        .addEventListener(
            "click",
            () => {

                closeProfileMenu();

                document
                    .getElementById(
                        "myListSection"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


    document
        .getElementById(
            "profileContinue"
        )
        .addEventListener(
            "click",
            () => {

                closeProfileMenu();

                document
                    .getElementById(
                        "continueSection"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


    updateAuthButton();

}



/* =========================================
   LOGIN
========================================= */

function handleLogin(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "loginEmail"
        ).value;


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const error =
        document.getElementById(
            "loginError"
        );


    const result =
        login(
            email,
            password
        );


    if (!result.success) {

        error.textContent =
            result.message;

        return;

    }


    error.textContent =
        "";


    closeAuth();


    updateAuthButton();


    showToast(
        `Welcome back, ${result.user.name}!`
    );

}



/* =========================================
   SIGN UP
========================================= */

function handleSignup(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "signupName"
        ).value;


    const email =
        document.getElementById(
            "signupEmail"
        ).value;


    const password =
        document.getElementById(
            "signupPassword"
        ).value;


    const confirm =
        document.getElementById(
            "signupConfirmPassword"
        ).value;


    const error =
        document.getElementById(
            "signupError"
        );


    if (
        password !== confirm
    ) {

        error.textContent =
            "Passwords do not match.";

        return;

    }


    if (
        password.length < 6
    ) {

        error.textContent =
            "Password must contain at least 6 characters.";

        return;

    }


    const result =
        register(
            name,
            email,
            password
        );


    if (!result.success) {

        error.textContent =
            result.message;

        return;

    }


    error.textContent =
        "";


    document
        .getElementById(
            "signupFormElement"
        )
        .reset();


    openLogin();


    document
        .getElementById(
            "loginEmail"
        )
        .value =
        email;


    showToast(
        "Account created successfully. Please sign in."
    );

}



/* =========================================
   OPEN LOGIN
========================================= */

function openLogin() {

    document
        .getElementById(
            "loginForm"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "signupForm"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "authModal"
        )
        .classList.add(
            "active"
        );


    document.body.style.overflow =
        "hidden";

}



/* =========================================
   OPEN SIGNUP
========================================= */

function openSignup() {

    document
        .getElementById(
            "loginForm"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "signupForm"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "authModal"
        )
        .classList.add(
            "active"
        );


    document.body.style.overflow =
        "hidden";

}



/* =========================================
   CLOSE AUTH
========================================= */

function closeAuth() {

    document
        .getElementById(
            "authModal"
        )
        .classList.remove(
            "active"
        );


    document.body.style.overflow =
        "";

}



/* =========================================
   UPDATE AUTH BUTTON
========================================= */

function updateAuthButton() {

    const button =
        document.getElementById(
            "signInButton"
        );


    const user =
        getCurrentUser();


    if (user) {

        button.textContent =
            user.name;

        button.classList.add(
            "logged-in"
        );

    } else {

        button.textContent =
            "Sign In";

        button.classList.remove(
            "logged-in"
        );

    }

}



/* =========================================
   PROFILE
========================================= */

function toggleProfileMenu() {

    const menu =
        document.getElementById(
            "profileMenu"
        );


    const user =
        getCurrentUser();


    if (!user) return;


    document
        .getElementById(
            "profileName"
        )
        .textContent =
        user.name;


    document
        .getElementById(
            "profileEmail"
        )
        .textContent =
        user.email;


    menu.classList.toggle(
        "active"
    );

}



function closeProfileMenu() {

    document
        .getElementById(
            "profileMenu"
        )
        .classList.remove(
            "active"
        );

}



function handleLogout() {

    logout();

    closeProfileMenu();

    updateAuthButton();

    showToast(
        "You have been signed out."
    );

}



/* =========================================
   SEARCH
========================================= */

function initializeSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const button =
        document.getElementById(
            "searchButton"
        );


    input.addEventListener(
        "input",
        performSearch
    );


    button.addEventListener(
        "click",
        performSearch
    );

}



function performSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const results =
        document.getElementById(
            "searchResults"
        );


    const query =
        input.value
            .trim()
            .toLowerCase();


    if (!query) {

        results.innerHTML = "";

        return;

    }


    const filtered =
        movies.filter(
            movie =>

                movie.title
                    .toLowerCase()
                    .includes(query)

                ||

                movie.genre
                    .toLowerCase()
                    .includes(query)

                ||

                movie.category
                    .toLowerCase()
                    .includes(query)

        );


    results.innerHTML = "";


    if (!filtered.length) {

        results.innerHTML = `

            <p class="no-results">
                No movies or shows found.
            </p>

        `;

        return;

    }


    filtered.forEach(
        movie => {

            results.appendChild(
                createMovieCard(
                    movie
                )
            );

        }
    );

}



/* =========================================
   EMAIL FORMS
========================================= */

function initializeEmailForms() {

    const hero =
        document.getElementById(
            "heroEmailForm"
        );


    const cta =
        document.getElementById(
            "ctaEmailForm"
        );


    hero.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            handleEmail(
                "heroEmail"
            );

        }
    );


    cta.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            handleEmail(
                "ctaEmail"
            );

        }
    );

}



function handleEmail(
    inputId
) {

    const input =
        document.getElementById(
            inputId
        );


    const email =
        input.value.trim();


    const valid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);


    if (!valid) {

        showToast(
            "Please enter a valid email address."
        );

        return;

    }


    openSignup();


    document
        .getElementById(
            "signupEmail"
        )
        .value =
        email;

}



/* =========================================
   CLOSE PROFILE WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
    "click",
    event => {

        const menu =
            document.getElementById(
                "profileMenu"
            );


        const button =
            document.getElementById(
                "signInButton"
            );


        if (
            menu &&
            menu.classList.contains(
                "active"
            ) &&
            !menu.contains(event.target) &&
            event.target !== button
        ) {

            closeProfileMenu();

        }

    }
);