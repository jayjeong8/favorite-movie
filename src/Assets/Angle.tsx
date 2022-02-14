import {motion} from "framer-motion";
import styled from "styled-components";

const Svg = styled(motion.svg)`
  width: 9px;
  height: 16px;
  border-color: ${props => props.theme.gray.gray};
`;

interface IAngle {
    X: number,
}

export default function Angle({X}: IAngle) {
    return (
        <Svg style={{scaleX: X}}>
            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1L1 8L8 15" stroke="#DDDDD6" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
        </Svg>
    )
}
