import styled from "styled-components";
import {motion} from "framer-motion";

export const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 12px;
  padding: 24px 64px;
  z-index: 99;
`;
export const Col = styled.div`
  display: flex;
  align-items: center;
`;
export const Filters = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Filter = styled(motion.li)`
  font-weight: bold;
  transition: color 0.3s ease-in-out;
  margin-right: 100px;
  position: relative;
  color: ${(props) => props.theme.gray.dark};
  &:nth-child(2){
    margin-right: 50px;
  }
`;
const Circle = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -14px;
  height: 28px;
  border-radius: 30px;
  border: 1.5px solid ${(props) => props.theme.yellow.light};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.yellow.dark};
  }
`;
export const MovieCircle = styled(Circle)`
  width: 80px;
`;
export const TVCircle = styled(Circle)`
  width: 48px;
  left: -16px;
`;
export const FavoriteCircle = styled(Circle)`
  width: 104px;
  left: -12px;
`;
export const Search = styled.form`
  color: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  position: relative;

  svg {
    height: 20px;
    padding-left: 4px;
  }
`;
export const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -184px;
  right: 0;
  padding: 4px 8px 4px 40px;
  width: 216px;
  height: 28px;
  z-index: -1;
  color: white;
  font-size: 12px;
  background-color: transparent;
  border: 1.5px solid ${(props) => props.theme.gray.light};
  border-radius: 30px;
  color: rgba(0,0,0,0);

  ::placeholder {
    color: ${(props) => props.theme.gray.light};
  }
`;