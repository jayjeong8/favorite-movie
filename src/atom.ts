import {atom} from "recoil";
import {IContent} from "./api";


//clicked
export const ClickedMovie = atom<IContent | undefined>({
    key: 'clickedMovie',
    default: undefined
})
export const ClickedTV = atom<IContent | undefined>({
    key: 'clickedTV',
    default: undefined
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

//search Index
export const SearchMovieIndex = atom({
    key: 'searchMovieIndex',
    default: 0,
});
export const SearchTVIndex = atom({
    key: 'searchTVIndex',
    default: 0,
});


//selected Row
export const SelectedRow = atom({
    key: 'selectedRow',
    default: ''
});

export const ModalLeaving = atom({
    key: 'modalLeaving',
    default:false
});

export const IncreaseState = atom({
    key: `IncreaseState`,
    default: true
})
