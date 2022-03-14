import styled from "styled-components";
import {motion} from "framer-motion";

export const Slider = styled.div`
  position: relative;
  width: 100vw;
  height: 30vw;
  top: -100px;
  margin-top: 64px;
`;
export const RowTitle = styled.div`
  color: ${props => props.theme.yellow.light};
  font-size: 24px;
  letter-spacing: -1.6px;
  margin: 16px 16%;
`;
export const InRow = styled(motion.div)`
  display: grid;
  width: 100%;
  gap: 1%;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  align-items: center;
  padding : 0 16%;
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
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  padding: 6px;
  height: 4vw;
`;

export const Info = styled(motion.div)`
  color: ${(props) => props.theme.gray.light};

  h4 {
    text-align: left;
    font-size: 12px;
    font-weight: bold;
  }
`;

