import {makeImagePath} from "../utils";
import {AnimatePresence, motion, useViewportScroll} from "framer-motion";
import {useMatch, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {ClickedMovie, ClickedTV, SelectedRow} from "../atom";
import {IBigModal} from "../api";
import {BigModal, BigOverview, BigTitle, Overlay, BigCover} from "./StyledBigModal"

export default function BigContentModal({media}:IBigModal) {
    const selectedRow = useRecoilValue(SelectedRow);
    const navigate = useNavigate();
    const bigMovieMatch = useMatch(media==="movie" ? "/movie/:movieId" :
        "/tv/:tvId");
    const onOverlayClick = () => {media==="movie" ? navigate("/movie") : navigate("/tv")};
    const {scrollY} = useViewportScroll();
    const clickedContents = useRecoilValue(media==="movie" ? ClickedMovie: ClickedTV);
    return (
        <>
            <AnimatePresence>
                {bigMovieMatch ? (
                    <>
                        <Overlay onClick={onOverlayClick}
                                 animate={{opacity: 1}}
                                 exit={{opacity: 0}}/>
                        <BigModal
                            style={{top: scrollY.get() + 100}}
                            layoutId={media==="movie" ?
                                (bigMovieMatch.params.movieId + selectedRow) :
                                (bigMovieMatch.params.tvId + selectedRow)}
                        >
                            {clickedContents && (
                                <>
                                    <BigCover
                                        style={{
                                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                clickedContents.backdrop_path ? clickedContents.backdrop_path : clickedContents.poster_path, "w780"
                                            )})`,
                                        }}
                                    />
                                    <BigTitle>{
                                        media==="movie" ? clickedContents.title
                                        : clickedContents.name}
                                    </BigTitle>
                                    <BigOverview>{clickedContents.overview}</BigOverview>
                                </>
                            )}
                        </BigModal>
                    </>
                ) : null}
            </AnimatePresence>
        </>
    )
}