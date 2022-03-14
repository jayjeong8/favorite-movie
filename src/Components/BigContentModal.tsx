import {makeImagePath} from "../utils";
import {AnimatePresence, useViewportScroll} from "framer-motion";
import {useMatch, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {ClickedFavorite, ClickedMovie, ClickedTV, SelectedRow} from "../atom";
import {IBigModal} from "../interface";
import {BigModal, BigOverview, BigTitle, Overlay, BigCover, BigDate, BigContainer} from "../Styled/StyledBigModal"

export default function BigContentModal({media}: IBigModal) {
    const selectedRow = useRecoilValue(SelectedRow);
    const navigate = useNavigate();
    const bigMovieMatch = useMatch(media === "movie" ? "movie/:movieId" :
        media === "tv" ? "/tv/:tvId" : "/favorite/:favoriteId");
    const onOverlayClick = () => {
        media === "movie" ? navigate("/")
            : media === "tv" ? navigate("/tv")
                : navigate("/favorite")
    };
    const {scrollY} = useViewportScroll();
    const clickedContents = useRecoilValue(media === "movie" ? ClickedMovie
        : media === "tv" ? ClickedTV
    :ClickedFavorite);
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
                                (bigMovieMatch.params.movieId + selectedRow)
                                : media === "tv" ?  (bigMovieMatch.params.tvId + selectedRow)
                                    :(bigMovieMatch.params.favoriteId + selectedRow)}
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
                                                : ("방송 시작: " + clickedContents.first_air_date)}
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