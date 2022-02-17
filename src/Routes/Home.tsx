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
} from "../api";
import {IGetContentsResult} from "../interface"

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
                        rowTitle={"현재 상영 중"}
                    />
                    <Row
                        queryKeyName1={"MOVIE"}
                        queryKeyName2={"topRated"}
                        getApi={getMovieTopRated}
                        rowTitle={"최고의 평가"}
                    />
                    <Row
                        queryKeyName1={"MOVIE"}
                        queryKeyName2={"popular"}
                        getApi={getMoviePopular}
                        rowTitle={"요즘 뜨는 영화"}
                    />
                    <Row
                        queryKeyName1={"MOVIE"}
                        queryKeyName2={"upcoming"}
                        getApi={getMovieUpcoming}
                        rowTitle={"개봉 예정"}
                    />
                    <BigContentModal media="movie"/>
                </>
            )}
        </Wrapper>
    );
}

export default Home;