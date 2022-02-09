import styled from "styled-components";
import {motion} from "framer-motion";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
export const BigModal = styled(motion.div)`
  position: absolute;
  width: 60vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 48px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  filter: drop-shadow(0 0 0.16rem crimson);
`;
export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 32px;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  top: -72px;
`;
export const BigDate = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding-left: 32px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  top: -72px;
`;
export const BigOverview = styled.p`
  font-size: 16px;
  padding: 32px;
  position: relative;
  line-height: 1.6;
  letter-spacing: -0.4px;
  top: -104px;
  color: ${(props) => props.theme.white.lighter};
`;