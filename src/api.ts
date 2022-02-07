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

export interface IContent {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    genres: IGenres[];
    name: string;
}

export interface IGetContentsResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IContent[];
    total_pages: number;
    total_results: number;
}

export interface IApi {
    queryKeyName1: string,
    queryKeyName2: string,
    getApi: any,
    rowTitle: string,
}
export interface IIndexControl {
    queryKeyName2: string;
    data:any;
}
export interface IBigModal {
    media:"movie"|"tv"|"search"
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

export function getMoviePopular() {
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getMovieUpcoming() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getTVAiringToday() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getTVTopRated() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getTVPopular() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getTVOnTheAir() {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getSearchMovie() {
    return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}`)
        .then(response => response.json());
}

export function getSearchTV() {
    return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}`)
        .then(response => response.json());
}
