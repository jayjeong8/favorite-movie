import {Box, Info, InfoContainer, RowTitle} from "../Styled/StyledRow";
import styled from "styled-components";
import {boxVariants} from "../Components/RowVariants";
import {makeImagePath} from "../utils";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {ClickedFavorite, FavoriteMovie, FavoriteTV} from "../atom";
import Star from "../Assets/Star";
import {COLOR_YELLOW} from "../theme";
import {useNavigate} from "react-router-dom";
import BigContentModal from "../Components/BigContentModal";
import {IContent} from "../interface";

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
  filter: drop-shadow(0 0 0.8rem black);
`;
const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Favorite() {
    const favoriteMovie = useRecoilValue(FavoriteMovie);
    const favoriteTV = useRecoilValue(FavoriteTV);

    const navigate = useNavigate();
    const setClickedFavorite = useSetRecoilState(ClickedFavorite);

    const onBoxClickedMovie = (content:IContent) => {
        navigate(`${content.id}`);
        setClickedFavorite(content);
    };
    const onBoxClickedTV = (content:IContent) => {
        navigate(`${content.id}`);
        setClickedFavorite(content);
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
                            onClick={() => onBoxClickedMovie(content)}
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
                            onClick={() => onBoxClickedTV(content)}
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
            <BigContentModal media="favorite"/>
        </Wrapper>
    )
}