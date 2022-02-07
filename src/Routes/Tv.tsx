import {useQuery} from "react-query";
import styled from "styled-components";
import {Loader} from "../Components/Loader";
import {makeImagePath} from "../utils";
import Row from "../Components/Row";
import {
    getTVAiringToday,
    getTVTopRated,
    getTVPopular,
    getTVOnTheAir,
    IGetContentsResult
} from "../api";
import BigContentModal from "../Components/BigContentModal";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8%;
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

function TV() {
    const {data, isLoading} = useQuery<IGetContentsResult>(
        ["TV", "topRatedTV"], getTVTopRated
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
                        <Title>{data?.results[0].name}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Row
                        queryKeyName1={"TV"}
                        queryKeyName2={"airingToday"}
                        getApi={getTVAiringToday}
                        rowTitle={"Airing Today"}
                    />
                    <Row
                        queryKeyName1={"TV"}
                        queryKeyName2={"topRatedTV"}
                         getApi={getTVTopRated}
                         rowTitle={"Top Rated"}
                    />
                    <Row
                        queryKeyName1={"TV"}
                        queryKeyName2={"popularTV"}
                         getApi={getTVPopular}
                         rowTitle={"Popular"}
                    />
                    <Row
                        queryKeyName1={"TV"}
                        queryKeyName2={"onTheAir"}
                         getApi={getTVOnTheAir}
                         rowTitle={"On The Air"}
                    />

                    <BigContentModal media="tv"/>
                </>
            )}
        </Wrapper>
    );
}

export default TV;