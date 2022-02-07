import {makeImagePath} from "../utils";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {getMovieNowPlaying, IGetMoviesResult} from "../api";

const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const RowTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 16px 2.1%;
`;
const InRow = styled(motion.div)`
  display: grid;
  gap: 1%;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  align-items: center;
  width: 96%;
  margin: 0 2% 16px 2%;
`;
const DecreaseButton = styled(motion.span)`
  z-index: 99;
  position: absolute;
  align-items: center;
  top: 134px;
  left: 0;
  background-color: tomato;
`;
const IncreaseButton = styled(motion.span)`
  z-index: 99;
  position: absolute;
  align-items: center;
  top: 134px;
  right: 0;
  background-color: tomato;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
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
        x: increase? window.outerWidth : -window.outerWidth
    }),
    visible: {
        x: 0,
    },
    exit: (increase: boolean)=> ({
        x: increase? -window.outerWidth : window.outerWidth
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

function Row() {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
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
            setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
    };
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            setIncreaseValue(true);
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const onBoxClicked = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };
    const {data, isLoading} = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"], getMovieNowPlaying
    );

    const NETFLIX_LOGO_URL =
        'https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4';

    return (
        <>
            <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <RowTitle>Now Playing</RowTitle>
            <DecreaseButton onClick={decreaseIndex}>left</DecreaseButton>
            <IncreaseButton onClick={increaseIndex}>right</IncreaseButton>
            <InRow
                variants={rowVariants}
                custom={increaseValue}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{type: "tween", duration: 1}}
                key={index}
            >
                {data?.results
                    .slice(1) //메인화면에 들어가는 영화 제외
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                        <Box
                            key={movie.id}
                            layoutId={movie.id + ""}
                            onClick={() => onBoxClicked(movie.id)}
                            variants={boxVariants}
                            initial="normal"
                            whileHover="hover"
                            transition={{type: "tween"}}
                            bgphoto={movie.backdrop_path ?
                                makeImagePath(movie.backdrop_path, "w500")
                                : NETFLIX_LOGO_URL}
                        >
                            <Info variants={infoVariants}>
                                <h4>{movie.title}</h4>
                            </Info>
                        </Box>
                    ))}
            </InRow>
                </AnimatePresence>
            </Slider>
        </>
    )
}
export default Row;