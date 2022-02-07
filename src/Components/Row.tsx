import {makeImagePath} from "../utils";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";
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
    IGetContentsResult, IApi
} from "../api";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    ClickedMovie, IncreaseState, ModalLeaving,
    MovieNowPlaying,
    MoviePopular,
    MovieTopRated,
    MovieUpcoming,
    SelectedRow,
    TVAiringToday, TVOnTheAir, TVPopular, TVTopRated,
} from "../atom";
import IndexControlButton from "./IndexControlButton";

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


function Row({queryKeyName1, queryKeyName2, getApi, rowTitle}: IApi) {

    const {data, isLoading} = useQuery<IGetContentsResult>(
        [queryKeyName1, queryKeyName2], getApi
    );
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useRecoilState(SelectedRow)
    const index = useRecoilValue(
        queryKeyName2 === "nowPlaying" ? MovieNowPlaying :
            queryKeyName2 === "topRated" ? MovieTopRated :
                queryKeyName2 === "popular" ? MoviePopular :
                    queryKeyName2 === "upcoming" ? MovieUpcoming :
                        queryKeyName2 === "airingToday" ? TVAiringToday :
                            queryKeyName2 === "topRatedTV" ? TVTopRated :
                                queryKeyName2 === "popularTV" ? TVPopular : TVOnTheAir
    );
    const setLeaving = useSetRecoilState(ModalLeaving);
    const increaseValue = useRecoilValue(IncreaseState);
    const toggleLeaving = () => setLeaving((prev: boolean) => !prev);

    const setClickedMovie = useSetRecoilState(ClickedMovie);
    const onBoxClicked = (contentId: number) => {
        queryKeyName1 === "MOVIE" ?
            navigate(`/movies/${contentId}`) : navigate(`/tv/${contentId}`)
        setSelectedRow(queryKeyName2);
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
                            <IndexControlButton
                                queryKeyName2={queryKeyName2}
                                data={data}/>
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