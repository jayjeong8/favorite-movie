import styled from "styled-components";
import {motion} from "framer-motion";

export const Slider = styled.div`
  position: relative;
  height: 26vw;
  top: -100px;
`;
export const RowTitle = styled.div`
  color: ${props => props.theme.yellow.dark};
  font-size: 24px;
  font-weight: bold;
  margin: 16px 16%;
`;
export const InRow = styled(motion.div)`
  display: grid;
  width: 82.5%;
  gap: 1%;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  align-items: center;
  margin: 0 16% 16px 16%;
  filter: drop-shadow(0 0 1.2rem black);
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 24px;
  height: 20vw;
  font-size: 64px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;
export const Info = styled(motion.div)`
  padding: 12px;
  border-radius: 2px 2px 22px 22px;
  background-color: ${(props) => props.theme.black};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 12px;
    font-weight: bold;
  }
`;