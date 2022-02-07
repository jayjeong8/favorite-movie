import {useLocation} from "react-router";
import {useQuery} from "react-query";
import {AnimatePresence} from "framer-motion";
import IndexControlButton from "../Components/IndexControlButton";
import {makeImagePath} from "../utils";
import {Slider, Info, Box, RowTitle, InRow} from "../Components/RowStyledComponent";
import {rowVariants, infoVariants, boxVariants} from "../Components/RowVariants";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {ClickedMovie, ClickedTV, IncreaseState, ModalLeaving, SearchIndex, SelectedRow} from "../atom";
import {IGetContentsResult} from "../api";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import BigContentModal from "../Components/BigContentModal";
import {useState} from "react";

const API_KEY = "8b0c5f0400aa76e404ea70c8b1e0ce22";
const BASE_PATH = "https://api.themoviedb.org/3";

const Wrapper = styled.div`
  margin-top: 32vh;
`;

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const movieData = useQuery<IGetContentsResult>(["movieSearch", keyword], async () => {
        return await fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`)
            .then(response => response.json())

    })
    const tvData = useQuery<IGetContentsResult>(["tvSearch", keyword], async () => {
        return await fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`)
            .then(response => response.json())
    })
    console.log(movieData)
    console.log(tvData)

    const setLeaving = useSetRecoilState(ModalLeaving);
    const increaseValue = useRecoilValue(IncreaseState);
    const toggleLeaving = () => setLeaving((prev: boolean) => !prev);
    const index = useRecoilValue(SearchIndex);

    const navigate = useNavigate();
    const setSelectedRow = useSetRecoilState(SelectedRow)
    const setClickedMovie = useSetRecoilState(ClickedMovie);
    const setClickedTV = useSetRecoilState(ClickedTV);
    const [mediaState, setMediaState] = useState("movie")
    const onBoxClicked = (contentId: number, checkMedia: string) => {
        checkMedia === "searchMovie" ?
            navigate(`/movie/${contentId}`) : navigate(`/tv/${contentId}`);
        setSelectedRow(checkMedia);
        const clicked =
            checkMedia === "searchMovie" ?
                movieData?.data?.results.find((content) => content.id === contentId || undefined)
                : tvData?.data?.results.find((content) => content.id === contentId || undefined)
        checkMedia === "searchMovie" ?
            setClickedMovie(clicked) : setClickedTV(clicked);
        checkMedia === "searchMovie" ?
            setMediaState("movie") : setMediaState("tv");
    };

    const offset = 6;
    const NETFLIX_LOGO_URL =
        'https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4';

    return (
        <Wrapper>
            <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    <RowTitle>Movie</RowTitle>
                    <IndexControlButton
                        queryKeyName2={keyword + ""}
                        data={movieData}/>
                    <InRow
                        variants={rowVariants}
                        custom={increaseValue}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{type: "tween", duration: 1}}
                        key={keyword + ""}
                    >
                        {movieData?.data?.results
                            .slice(offset * index, offset * index + offset)
                            .map((content) => (
                                <Box
                                    key={content.id + (keyword + "")}
                                    layoutId={content.id + (keyword + "")}
                                    onClick={() => onBoxClicked(content.id, "searchMovie")}
                                    variants={boxVariants}
                                    initial="normal"
                                    whileHover="hover"
                                    transition={{type: "tween"}}
                                    bgphoto={content.poster_path ?
                                        makeImagePath(content.poster_path, "w780")
                                        : NETFLIX_LOGO_URL}
                                >
                                    <Info variants={infoVariants}>
                                        <h4>{content.title}</h4>
                                    </Info>
                                </Box>
                            ))}
                    </InRow>
                </AnimatePresence>
            </Slider>
            <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    <RowTitle>TV show</RowTitle>
                    <IndexControlButton
                        queryKeyName2={keyword + ""}
                        data={tvData}/>
                    <InRow
                        variants={rowVariants}
                        custom={increaseValue}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{type: "tween", duration: 1}}
                        key={keyword + ""}
                    >
                        {tvData?.data?.results
                            .slice(offset * index, offset * index + offset)
                            .map((content) => (
                                <Box
                                    key={content.id + "tv" + (keyword + "")}
                                    layoutId={content.id + "tv" + (keyword + "")}
                                    onClick={() => onBoxClicked(content.id, "searchTV")}
                                    variants={boxVariants}
                                    initial="normal"
                                    whileHover="hover"
                                    transition={{type: "tween"}}
                                    bgphoto={content.poster_path ?
                                        makeImagePath(content.poster_path, "w780")
                                        : NETFLIX_LOGO_URL}
                                >
                                    <Info variants={infoVariants}>
                                        <h4>{content.name}</h4>
                                    </Info>
                                </Box>
                            ))}
                    </InRow>
                </AnimatePresence>
            </Slider>
            <BigContentModal media={mediaState==="movie" ? "movie" : "tv"}/>
        </Wrapper>
    )

}

export default Search;