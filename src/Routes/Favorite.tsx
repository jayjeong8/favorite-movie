import {Box, Info, InfoContainer, RowTitle} from "../Styled/StyledRow";
import styled from "styled-components";
import {boxVariants} from "../Components/RowVariants";
import {makeImagePath} from "../utils";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {ClickedMovie, ClickedTV, FavoriteMovie, FavoriteTV} from "../atom";
import Star from "../Assets/Star";
import {COLOR_YELLOW} from "../theme";
import {BigContainer, BigCover, BigDate, BigModal, BigOverview, BigTitle, Overlay} from "../Styled/StyledBigModal";
import {AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  margin-top: 42vh;
  position: relative;
`;
const Title = styled.div`
  position: absolute;
  top: -24vh;
  margin-left: 14vw;
  font-size: 40px;
`;
export const BoxContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 1%;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 4%;
  padding: 0 16%;
  align-items: center;
  margin-bottom: 80px;
`;
const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Favorite() {
    const navigate = useNavigate();
    const setClickedMovie = useSetRecoilState(ClickedMovie);
    const setClickedTV = useSetRecoilState(ClickedTV);

    const onBoxClickedMovie = (contentId: number) => {
        navigate(`movie/${contentId}`);
        const clicked = data?.results.find((content) => content.id === contentId || undefined);
        setClickedMovie(clicked);
    };
    const NETFLIX_LOGO_URL =
        'https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4';

    return (
        <Wrapper>
            <Title>{`나의 인생작`}</Title>
            <RowTitle>영화</RowTitle>
            <BoxContainer>
                {favoriteMovie.map((content) => (
                    <BoxWrapper>
                        <Box
                            key={content.id + "movie"}
                            layoutId={content.id + ""}
                            onClick={() => onBoxClickedMovie(content.id)}
                            variants={boxVariants}
                            initial="normal"
                            whileHover="hover"
                            transition={{type: "tween"}}
                            bgphoto={content.poster_path ?
                                makeImagePath(content.poster_path, "w500")
                                : NETFLIX_LOGO_URL}
                        >
                        </Box>
                        <InfoContainer>
                            <Info>
                                <h4>{content.title}</h4>
                            </Info>
                            <Star content={content} color={COLOR_YELLOW} checkMedia={"MOVIE"}/>
                        </InfoContainer>
                    </BoxWrapper>
                ))}
            </BoxContainer>
            <RowTitle>TV 프로그램</RowTitle>
            <BoxContainer>
                {favoriteTV.map((content) => (
                    <BoxWrapper>
                        <Box
                            key={content.id + "tv"}
                            layoutId={content.id + ""}
                            onClick={() => onTVBoxClicked(content.id)}
                            variants={boxVariants}
                            initial="normal"
                            whileHover="hover"
                            transition={{type: "tween"}}
                            bgphoto={content.poster_path ?
                                makeImagePath(content.poster_path, "w500")
                                : NETFLIX_LOGO_URL}
                        >
                        </Box>
                        <InfoContainer>
                            <Info>
                                <h4>{content.name}</h4>
                            </Info>
                            <Star content={content} color={COLOR_YELLOW} checkMedia={"TV"}/>
                        </InfoContainer>
                    </BoxWrapper>
                ))}
            </BoxContainer>
            <AnimatePresence>
                {savedId ? (
                    <>
                        <Overlay onClick={onOverlayClick}
                                 animate={{opacity: 1}}
                                 exit={{opacity: 0}}/>
                        <BigModal
                            style={{top: scrollY.get() - 220}}
                            layoutId={savedId + ""}
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
                                                checkMedia === "searchMovie" ? clickedContents.title
                                                    : clickedContents.name}
                                            </BigTitle>
                                            <BigDate>{checkMedia === "searchMovie" ? ("개봉: " + clickedContents.release_date)
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
        </Wrapper>
    )
}