const API_KEY = "8b0c5f0400aa76e404ea70c8b1e0ce22";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovieNowPlaying() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`)
        .then(response => response.json());
}

export function getMovieTopRated() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`)
        .then(response => response.json());
}

export function getMoviePopular() {
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko`)
        .then(response => response.json());
}

export function getMovieUpcoming() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`)
        .then(response => response.json());
}

export function getTVAiringToday() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko`)
        .then(response => response.json());
}

export function getTVTopRated() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`)
        .then(response => response.json());
}

export function getTVPopular() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`)
        .then(response => response.json());
}

export function getTVOnTheAir() {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko`)
        .then(response => response.json());
}