import {useQuery} from "react-query";
import {Loader} from "../Components/Loader";
import {Wrapper, Banner, Title, Overview} from "../Styled/StyledHome"
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