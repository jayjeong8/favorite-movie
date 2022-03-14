import {Box, Info, InfoContainer, RowTitle} from "../Styled/StyledRow";
import styled from "styled-components";
import {boxVariants} from "../Components/RowVariants";
import {makeImagePath} from "../utils";
import {useRecoilValue} from "recoil";
import {FavoriteMovie, FavoriteTV} from "../atom";
import Star from "../Assets/Star";
import {COLOR_YELLOW} from "../theme";

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
  width: 82.5%;
  gap: 1%;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
`;
const BoxWrapper = styled.div`
  display: flex;
`

export default function Favorite() {
    const favoriteMovie = useRecoilValue(FavoriteMovie);
    const favoriteTV = useRecoilValue(FavoriteTV);
    const onMovieBoxClicked = (id: number) => {
    }

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
                            onClick={() => onMovieBoxClicked(content.id)}
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
                            <Star content={content} color={COLOR_YELLOW}/>
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
                            onClick={() => onMovieBoxClicked(content.id)}
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
                            <Star content={content} color={COLOR_YELLOW}/>
                        </InfoContainer>
                    </BoxWrapper>
                ))}
            </BoxContainer>
        </Wrapper>
    )
}