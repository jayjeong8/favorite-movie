import styled from "styled-components";
import {motion} from "framer-motion";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;
export const BigModal = styled(motion.div)`
  position: absolute;
  width: 56vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 48px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black};
  filter: drop-shadow(0 0 0.8rem black);
`;
export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 66%;
`;
export const BigContainer = styled.div`
  top: -20px;
  display: grid;
  padding: 28px;
  gap: 1%;
  grid-template-columns: repeat(2, 1fr);
`;

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.yellow.light};
  font-size: 24px;
  position: relative;

`;
export const BigDate = styled.div`
  color: ${(props) => props.theme.gray.gray};
  font-size: 16px;
  margin-left: 2px;
  font-weight: bold;
  position: relative;
`;
export const BigOverview = styled.p`
  top: 2px;
  height: 21vh;
  position: relative;
  padding: 0 32px;
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: -0.4px;
  color: ${(props) => props.theme.gray.light};
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.gray.light};
    border-radius: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.gray.dark};
    border-radius: 20px;
  }
`;