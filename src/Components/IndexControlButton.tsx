import styled from "styled-components";
import {motion} from "framer-motion";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    IncreaseState,
    ModalLeaving,
    MovieNowPlaying,
    MoviePopular,
    MovieTopRated,
    MovieUpcoming, SearchMovieIndex, SearchTVIndex,
    TVAiringToday, TVOnTheAir, TVPopular,
    TVTopRated
} from "../atom";
import {IIndexControl} from "../api";
import Angle from "../Assets/Angle";

const Button = styled(motion.span)`
  z-index: 2;
  position: absolute;
  align-items: center;
  top: 13vw;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
`;
const DecreaseButton = styled(Button)`
  left: 12vw;
`;
const IncreaseButton = styled(Button)`
  right: 12vw;
`;

export default function IndexControlButton({queryKeyName2, data}: IIndexControl) {
    const [leaving, setLeaving] = useRecoilState(ModalLeaving);
    const setIndex = useSetRecoilState(
        queryKeyName2 === "nowPlaying" ? MovieNowPlaying :
            queryKeyName2 === "topRated" ? MovieTopRated :
                queryKeyName2 === "popular" ? MoviePopular :
                    queryKeyName2 === "upcoming" ? MovieUpcoming :
                        queryKeyName2 === "airingToday" ? TVAiringToday :
                            queryKeyName2 === "topRatedTV" ? TVTopRated :
                                queryKeyName2 === "popularTV" ? TVPopular :
                                    queryKeyName2 === "onTheAir" ? TVOnTheAir :
                                        queryKeyName2 === "searchMovie" ? SearchMovieIndex :
                                            SearchTVIndex
    )
    const toggleLeaving = () => setLeaving((prev: boolean) => !prev);
    const setIncreaseValue = useSetRecoilState(IncreaseState);
    const totalMovies = data?.results?.length;
    const offset = 5;
    const maxIndex = Math.floor(totalMovies ? (totalMovies / offset - 1) : 1);

    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            setIncreaseValue(true);
            toggleLeaving();
            setIndex((prev: number) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const decreaseIndex = () => {
        if (data) {
            if (leaving) return;
            setIncreaseValue(false);
            toggleLeaving();
            setIndex((prev: number) => (prev === 0 ? maxIndex : prev - 1));
        }
    };
    return (<>
        <DecreaseButton onClick={decreaseIndex}>
            <Angle X={1}/>
        </DecreaseButton>
        <IncreaseButton onClick={increaseIndex}>
            <Angle X={-1}/>
        </IncreaseButton>
    </>)

}