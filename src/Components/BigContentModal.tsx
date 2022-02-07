import {makeImagePath} from "../utils";
import {AnimatePresence, motion, useViewportScroll} from "framer-motion";
import {useMatch, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {ClickedMovie, ClickedTV, SelectedRow} from "../atom";
import {IBigModal} from "../api";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigModal = styled(motion.div)`
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

export default function BigContentModal({media}:IBigModal) {
    const selectedRow = useRecoilValue(SelectedRow);
    const navigate = useNavigate();
    const bigMovieMatch = useMatch(media==="movie" ?
        "/movie/:movieId" :
        "/tv/:tvId");
    const onOverlayClick = () => {media==="movie" ? navigate("/movie") : navigate("/tv")};
    const {scrollY} = useViewportScroll();
    const clickedContents = useRecoilValue(media==="movie" ? ClickedMovie: ClickedTV);
console.log(clickedContents)
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
                                                clickedContents.backdrop_path ? clickedContents.backdrop_path : clickedContents.poster_path, "w1280"
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