import styled from "styled-components";
import {motion} from "framer-motion";

export const Slider = styled.div`
  position: relative;
  height: 26vw;
  top: -100px;
`;
export const RowTitle = styled.div`
  color: ${props => props.theme.yellow.light};
  font-size: 24px;
  letter-spacing: -1.6px;
  margin: 36px 16% 16px 16.2%;
`;
export const InRow = styled(motion.div)`
  display: grid;
  width: 82.5%;
  gap: 1%;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  align-items: center;
  margin: 0 16%;
  filter: drop-shadow(0 0 0.8rem black);
`;

export const BoxContainer = styled.div`
display: flex;
  flex-direction: column;
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 24px;
  border: 10px, solid, ${props => props.theme.yellow.dark};
  height: 20vw;
  font-size: 64px;
  cursor: pointer;
  position: relative;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  padding: 6px;
`;

export const Info = styled(motion.div)`
  // padding: 12px;
  
  color: ${(props) => props.theme.gray.light};

  h4 {
    text-align: center;
    font-size: 12px;
    font-weight: bold;
  }
`;

