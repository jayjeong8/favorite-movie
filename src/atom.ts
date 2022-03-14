import {atom} from "recoil";
import {IContent, IStar} from "./interface";


//clicked content
export const ClickedMovie = atom<IContent | undefined>({
    key: 'clickedMovie',
    default: undefined
})
export const ClickedTV = atom<IContent | undefined>({
    key: 'clickedTV',
    default: undefined
})
export const ClickedFavorite = atom<IContent | undefined>({
    key: 'clickedFavorite',
    default: undefined
})

//favorite content
let favoriteMovie = localStorage.getItem("savedFavoriteMovie");
let localFavoriteMovie = JSON.parse(favoriteMovie as any);
export const FavoriteMovie = atom<IContent[]>({
    key: 'favoriteMovie',
    default: localFavoriteMovie?.length > 0 ? localFavoriteMovie : []
})

let favoriteTV = localStorage.getItem("savedFavoriteTV");
let localFavoriteTV = JSON.parse(favoriteTV as any);
export const FavoriteTV = atom<IContent[]>({
    key: 'favoriteTV',
    default: localFavoriteTV?.length > 0 ? localFavoriteTV : []
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
