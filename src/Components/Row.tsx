import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight,} from '@fortawesome/free-solid-svg-icons'
import {makeImagePath} from "../utils";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";
import {useMatch, useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {
    getMovieNowPlaying,
    getMovieLatest,
    getMovieTopRated,
    getMovieUpcoming,
    getTVAiringToday,
    getTVTopRated,
    getTVPopular,
    getTVOnTheAir,
    IGetContentsResult
} from "../api";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    ClickedMovie,
    MovieNowPlaying,
    MoviePopular,
    MovieTopRated,
    MovieUpcoming,
    SelectedRow,
    TVAiringToday, TVOnTheAir, TVPopular, TVTopRated,
} from "../atom";

const Slider = styled.div`
  position: relative;
  height: 26vw;
  top: -100px;
`;
const RowTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 16px 8%;
`;
const InRow = styled(motion.div)`
  display: grid;
  width: 80%;
  gap: 1%;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  align-items: center;
  margin: 0 10% 16px 10%;
`;
const DecreaseButton = styled(motion.span)`
  z-index: 2;
  position: absolute;
  align-items: center;
  top: 13vw;
  left: 4%;
`;
const IncreaseButton = styled(motion.span)`
  z-index: 2;
  position: absolute;
  align-items: center;
  top: 13vw;
  right: 4%;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 20vw;
  font-size: 64px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 16px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 12px;
  }
`;

const rowVariants = {
    hidden: (increase: boolean) => ({
        x: increase ? window.outerWidth : -window.outerWidth
    }),
    visible: {
        x: 0,
    },
    exit: (increase: boolean) => ({
        x: increase ? -window.outerWidth : window.outerWidth
    }),
};
const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.2,
        y: -80,
        transition: {
            delay: 0.4,
            duration: 0.3,
            type: "tween",
        }
    },
};
const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.4,
            duration: 0.3,
            type: "tween",
        }
    },
};

const offset = 6;

interface IApi {
    queryKeyName1: string,
    queryKeyName2: string,
    getApi: any,
    rowTitle: string,
}

function Row({queryKeyName1, queryKeyName2, getApi, rowTitle}: IApi) {

    const {data, isLoading} = useQuery<IGetContentsResult>(
        [queryKeyName1, queryKeyName2], getApi
    );
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useRecoilState(SelectedRow)
    const [index, setIndex] = useRecoilState(
        queryKeyName2 === "nowPlaying" ? MovieNowPlaying :
            queryKeyName2 === "topRated" ? MovieTopRated :
                queryKeyName2 === "popular" ? MoviePopular :
                    queryKeyName2 === "upcoming" ? MovieUpcoming :
                        queryKeyName2 === "airingToday" ? TVAiringToday :
                            queryKeyName2 === "topRatedTV" ? TVTopRated :
                                queryKeyName2 === "popularTV" ? TVPopular : TVOnTheAir
    );
    const [leaving, setLeaving] = useState(false);
    const [increaseValue, setIncreaseValue] = useState(true);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const decreaseIndex = () => {
        if (data) {
            if (leaving) return;
            setIncreaseValue(false);
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev: number) => (prev === 0 ? maxIndex : prev - 1));
        }
    };
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            setIncreaseValue(true);
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev: number) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const setClickedMovie = useSetRecoilState(ClickedMovie);
    const onBoxClicked = (contentId: number) => {
        queryKeyName1 === "MOVIE" ?
            navigate(`/movies/${contentId}`) : navigate(`/tv/${contentId}`)
        setSelectedRow(queryKeyName2);
        console.log(data?.results.find((content) => content.id === contentId || undefined));
        const clicked = data?.results.find((content) => content.id === contentId || undefined);
        setClickedMovie(clicked);
    };

    const NETFLIX_LOGO_URL =
        'https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4';

    return (
        <>{isLoading ? (<h2>Loading..</h2>)
            : (
                <>
                    <Slider>
                        <AnimatePresence key={queryKeyName2} initial={false} onExitComplete={toggleLeaving}>
                            <RowTitle>{rowTitle}</RowTitle>
                            <DecreaseButton onClick={decreaseIndex}>
                                <FontAwesomeIcon icon={faAngleLeft}
                                                 size="2x"/>
                            </DecreaseButton>
                            <IncreaseButton onClick={increaseIndex}>
                                <FontAwesomeIcon icon={faAngleRight}
                                                 size="2x"/>
                            </IncreaseButton>
                            <InRow
                                variants={rowVariants}
                                custom={increaseValue}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{type: "tween", duration: 1}}
                                key={index + queryKeyName2}
                            >
                                {data?.results
                                    .slice(1) //메인화면에 들어가는 영화 제외
                                    .slice(offset * index, offset * index + offset)
                                    .map((content) => (
                                        <Box
                                            key={content.id + queryKeyName2}
                                            layoutId={content.id + queryKeyName2}
                                            onClick={() => onBoxClicked(content.id)}
                                            variants={boxVariants}
                                            initial="normal"
                                            whileHover="hover"
                                            transition={{type: "tween"}}
                                            bgphoto={content.poster_path ?
                                                makeImagePath(content.poster_path, "w780")
                                                : NETFLIX_LOGO_URL}
                                        >
                                            <Info variants={infoVariants}>
                                                <h4>{queryKeyName1 === "MOVIE" ? content.title : content.name}</h4>
                                            </Info>
                                        </Box>
                                    ))}
                            </InRow>
                        </AnimatePresence>
                    </Slider>
                </>
            )
        }
        </>
    )
}

export default Row;