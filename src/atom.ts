import {atom} from "recoil";
import {IGetMoviesResult, IMovie} from "./api";

export interface IClickedMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

//clicked movie
export const ClickedMovie = atom<IMovie[]>({
    key: 'clickedMovie',
    default: [],
})

//movie index
export const MovieNowPlaying = atom({
    key: 'movieNowPlaying',
    default: 0,
});
export const MovieTopRated = atom({
    key: 'movieTopRated',
    default: 0,
});
export const MoviePopular = atom({
    key: 'moviePopular',
    default: 0,
});
export const MovieUpcoming = atom({
    key: 'movieUpcoming',
    default: 0,
});

//tv index
export const TVAiringToday = atom({
    key: 'tvAiringToday',
    default: 0,
});
export const TVTopRated = atom({
    key: 'tvTopRated',
    default: 0,
});
export const TVPopular = atom({
    key: 'tvPopular',
    default: 0,
});
export const TVOnTheAir = atom({
    key: 'tvOnTheAir',
    default: 0,
});

//selected Row
export const SelectedRow = atom({
    key: 'selectedRow',
    default: 'nowPlaying'
})
