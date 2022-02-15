import {makeImagePath} from "../utils";
import {AnimatePresence, useViewportScroll} from "framer-motion";
import {useMatch, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {ClickedMovie, ClickedTV, SelectedRow} from "../atom";
import {IBigModal} from "../api";
import {BigModal, BigOverview, BigTitle, Overlay, BigCover, BigDate, BigContainer} from "../Styled/StyledBigModal"
import {COLOR_BLACK, COLOR_ZEROBLACK} from "../theme";

export default function BigContentModal({media}: IBigModal) {
    const selectedRow = useRecoilValue(SelectedRow);
    const navigate = useNavigate();
    const bigMovieMatch = useMatch(media === "movie" ? "movie/:movieId" :
        "/tv/:tvId");
    const onOverlayClick = () => {
        media === "movie" ? navigate("/") : navigate("/tv")
    };
    const {scrollY} = useViewportScroll();
    const clickedContents = useRecoilValue(media === "movie" ? ClickedMovie : ClickedTV);
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
                            layoutId={media === "movie" ?
                                (bigMovieMatch.params.movieId + selectedRow) :
                                (bigMovieMatch.params.tvId + selectedRow)}
                        >
                            {clickedContents && (
                                <>
                                    <BigCover
                                        style={{
                                            backgroundImage: `url(${makeImagePath(
                                                clickedContents.backdrop_path ? clickedContents.backdrop_path : clickedContents.poster_path, "w1280"
                                            )})`,
                                        }}
                                    />
                                    <BigContainer>
                                        <div>
                                            <BigTitle>{
                                                media === "movie" ? clickedContents.title
                                                    : clickedContents.name}
                                            </BigTitle>
                                            <BigDate>{media === "movie" ? ("개봉: " + clickedContents.release_date)
                                                : ("방송 시작: " +clickedContents.first_air_date)}
                                            </BigDate>
                                        </div>
                                        <div>
                                            <BigOverview>{clickedContents.overview}</BigOverview>
                                        </div>
                                    </BigContainer>
                                </>
                            )}
                        </BigModal>
                    </>
                ) : null}
            </AnimatePresence>
        </>
    )
}