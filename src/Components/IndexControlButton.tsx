import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
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


const DecreaseButton = styled(motion.span)`
  z-index: 2;
  position: absolute;
  align-items: center;
  top: 13vw;
  left: 12%;
  cursor: pointer;
  color: rgba(255,255,255,0.4);
`;
const IncreaseButton = styled(motion.span)`
  z-index: 2;
  position: absolute;
  align-items: center;
  top: 13vw;
  right: 12%;
  cursor: pointer;
  color: rgba(255,255,255,0.4);
`;

const offset = 5;

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

    const totalMovies = data.results.length + 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
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
            <FontAwesomeIcon icon={faAngleLeft}
                             size="2x"/>
        </DecreaseButton>
        <IncreaseButton onClick={increaseIndex}>
            <FontAwesomeIcon icon={faAngleRight}
                             size="2x"/>
        </IncreaseButton>
    </>)

}