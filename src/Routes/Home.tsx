import {useQuery} from "react-query";
import styled from "styled-components";
import {makeImagePath} from "../utils";
import Row from "../Components/Row";
import {
    getMovieNowPlaying,
    getMovieTopRated,
    getMoviePopular,
    getMovieUpcoming,
    IGetContentsResult,
} from "../api";

import BigContentModal from "../Components/BigContentModal";

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
  padding: 0 16%;
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

function Home() {
    const {data, isLoading} = useQuery<IGetContentsResult>(
        ["movies", "nowPlaying"], getMovieNowPlaying
    );

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
                    <BigContentModal media="movie"/>
                </>
            )}
        </Wrapper>
    );
}

export default Home;