import {atom} from "recoil";

/*interface IIndex {
  index: number;
}*/

//index atom

export const NowPlaying = atom({
   key: 'nowPlaying',
   default: 0,
});

export const TopRated = atom({
    key: 'topRated',
    default: 0,
});