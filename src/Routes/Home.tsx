import {useQuery} from "react-query";
import styled from "styled-components";
import {motion, AnimatePresence, useViewportScroll} from "framer-motion";
import {makeImagePath} from "../utils";
import {useMatch, useNavigate} from "react-router-dom";
import Row from "../Components/Row";
import {
    getMovieNowPlaying,
    getMovieTopRated,
    getMovieUpcoming,
    IGetContentsResult, getMoviePopular
} from "../api";
import {ClickedMovie, SelectedRow} from "../atom";
import {useRecoilValue} from "recoil";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
  url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 56px;
  margin-bottom: 16px;
`;
const Overview = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-left: 4px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMovieModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;
const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;


function Home() {
    const selectedRow = useRecoilValue(SelectedRow);
    const navigate = useNavigate();
    const onOverlayClick = () => {
        navigate("/")
    };
    const {scrollY} = useViewportScroll();

    const bigMovieMatch = useMatch("/movies/:movieId");
    const {data, isLoading} = useQuery<IGetContentsResult>(
        ["movies", "nowPlaying"], getMovieNowPlaying
    );
    const clickedMovie = useRecoilValue(ClickedMovie);

    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading..</Loader>
            ) : (
                <>
                    <Banner
                        bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Row
                        queryKeyName1={"MOVIE"}
                        queryKeyName2={"nowPlaying"}
                        getApi={getMovieNowPlaying}
                        rowTitle={"Now Playing"}
                    />
                    <Row
                        queryKeyName1={"MOVIE"}
                        queryKeyName2={"topRated"}
                        getApi={getMovieTopRated}
                        rowTitle={"Top Rated"}
                    />
                    <Row
                        queryKeyName1={"MOVIE"}
                        queryKeyName2={"popular"}
                        getApi={getMoviePopular}
                        rowTitle={"Popular"}
                    />
                    <Row
                        queryKeyName1={"MOVIE"}
                        queryKeyName2={"upcoming"}
                        getApi={getMovieUpcoming}
                        rowTitle={"Upcoming"}
                    />

                    <AnimatePresence>
                        {bigMovieMatch ? (
                            <>
                                <Overlay onClick={onOverlayClick}
                                         animate={{opacity: 1}}
                                         exit={{opacity: 0}}/>
                                <BigMovieModal
                                    style={{top: scrollY.get() + 100}}
                                    layoutId={bigMovieMatch.params.movieId + selectedRow}
                                >
                                    {clickedMovie && (
                                        <>
                                            <BigCover
                                                style={{
                                                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                        clickedMovie.backdrop_path ? clickedMovie.backdrop_path : clickedMovie.poster_path, "w1280"
                                                    )})`,
                                                }}
                                            />
                                            <BigTitle>{clickedMovie.title}</BigTitle>
                                            <BigOverview>{clickedMovie.overview}</BigOverview>
                                        </>
                                    )}
                                </BigMovieModal>
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Home;