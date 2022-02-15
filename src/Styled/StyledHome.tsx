import styled from "styled-components";
import {COLOR_BLACK, COLOR_ZEROBLACK} from "../theme";

export const Wrapper = styled.div`
  background: ${(props => props.theme.black)};
  padding-bottom: 40px;
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
  font-size: 72px;
  font-weight: 300;
  letter-spacing: -4px;
  margin-left: -1px;
  margin-bottom: 24px;
  color: ${props => props.theme.yellow.light};
  filter: drop-shadow(0 0 1.2rem black);
`;
export const Overview = styled.p`
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: -1px;
  margin-left: 4px;
  width: 60%;
  color: ${props => props.theme.gray.light};
`;
