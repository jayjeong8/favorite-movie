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
  height: 400px;
`;
export const BigTitle = styled.h3`
  color: ${(props) => props.theme.yellow.light};
  padding: 28px;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  top: -72px;
`;
export const BigDate = styled.div`
  color: ${(props) => props.theme.white};
  padding-left: 32px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  top: -72px;
`;
export const BigOverview = styled.p`
  height: 12vh;
  position: relative;
  padding: 0 32px;
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: -0.4px;
  top: -80px;
  color: ${(props) => props.theme.white};
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