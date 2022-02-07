import {makeImagePath} from "../utils";
import {AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {IGetContentsResult, IApi} from "../api";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {
    ClickedMovie, ClickedTV, IncreaseState, ModalLeaving,
    MovieNowPlaying,
    MoviePopular,
    MovieTopRated,
    MovieUpcoming,
    SelectedRow,
    TVAiringToday, TVOnTheAir, TVPopular, TVTopRated,
} from "../atom";
import IndexControlButton from "./IndexControlButton";
import {Slider, Info, Box, RowTitle, InRow} from "./RowStyledComponent";
import {rowVariants, infoVariants, boxVariants} from "./RowVariants";


function Row({queryKeyName1, queryKeyName2, getApi, rowTitle}: IApi) {

    const {data, isLoading} = useQuery<IGetContentsResult>(
        [queryKeyName1, queryKeyName2], getApi
    );
    const navigate = useNavigate();
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

    const setSelectedRow = useSetRecoilState(SelectedRow)
    const setClickedMovie = useSetRecoilState(ClickedMovie);
    const setClickedTV = useSetRecoilState(ClickedTV);
    const onBoxClicked = (contentId: number) => {
        queryKeyName1 === "MOVIE" ?
            navigate(`/movie/${contentId}`) : navigate(`/tv/${contentId}`)
        setSelectedRow(queryKeyName2);
        const clicked = data?.results.find((content) => content.id === contentId || undefined);
        queryKeyName1 === "MOVIE" ?
            setClickedMovie(clicked): setClickedTV(clicked);
    };

    const offset = 6;
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