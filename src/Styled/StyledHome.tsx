import styled from "styled-components";
import {COLOR_BLACK, COLOR_ZEROBLACK} from "../theme";

export const Wrapper = styled.div`
  background: ${(props => props.theme.black)};
  padding-bottom: 200px;
`;
export const Banner = styled.div<{ bgPhoto: string }>`
  height: 96vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16%;
  background-image: linear-gradient(${COLOR_ZEROBLACK}, ${COLOR_BLACK}),
  url(${(props) => props.bgPhoto});
  background-size: cover;
`;
export const Title = styled.h2`
  font-size: 56px;
  margin-bottom: 16px;
`;
export const Overview = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-left: 4px;
  width: 50%;
`;