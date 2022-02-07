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
export const Popular = atom({
    key: 'popular',
    default: 0,
});

//selected Row
export const SelectedRow = atom({
    key: 'selectedRow',
    default: 'nowPlaying'
})