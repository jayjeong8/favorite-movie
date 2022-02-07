const API_KEY = "8b0c5f0400aa76e404ea70c8b1e0ce22";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IFavorite {
    id: number;
    favorite: boolean;
    rated: object | boolean;
    watchlist: boolean;
}

interface IGenres {
    id: number,
    name: string;
}
interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    genres : IGenres[];
}
export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

interface ITV {
    id: number;
    backdrop_path: string;
    poster_path: string;
    first_air_date: string;
    name: string;
    overview: string;
}
export interface IGetTVResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: ITV[];
    total_pages: number;
    total_results: number;
}

export interface IGetSearchResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[] | ITV[];
    total_pages: number;
    total_results: number;
}

export function getMovieNowPlaying() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
        .then(response => response.json());
}
export function getMovieLatest() {
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`)
        .then(response => response.json());
}
export function getMovieTopRated() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
        .then(response => response.json());
}
export function getMovieUpcoming() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getTVAiringToday() {
    return fetch(`${BASE_PATH}/movie/airing_today?api_key=${API_KEY}`)
        .then(response => response.json());
}
export function getTVLatestShows() {
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`)
        .then(response => response.json());
}
export function getTVTopRated() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
        .then(response => response.json());
}
export function getTVPopular() {
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getSearch() {
    return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}`)
        .then(response => response.json());
}