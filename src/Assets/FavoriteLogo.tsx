import {motion} from "framer-motion";
import styled from "styled-components";

const Svg = styled(motion.svg)`
  margin-right: 48px;
  width: 96px;
  height: 24px;
  border-color: ${props => props.theme.white};
  filter: drop-shadow(0 0 1.2rem black);
`;

const logoVariants = {
    normal: {strokeOpacity: 1},
    active: {
        strokeOpacity: [0, 1, 0],
        transition: {repeat: Infinity}
    },
}

const strokeWidth = "2.5"

export default function FavoriteLogo() {
    return (
        <Svg
            variants={logoVariants}
            animate="normal"
            whileHover="active"
            width="134" height="39" viewBox="0 0 134 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path d="M110.024 28.323H119.058C122.069 28.323 128.092 30.1298 128.092 37.3571" stroke="#D3D3C5"
                         strokeWidth={strokeWidth} strokeLinecap="round"/>
            <motion.path d="M132.609 10.2546H123.575" stroke="#D3D3C5" strokeWidth={strokeWidth} strokeLinecap="round"/>
            <motion.path
                d="M114.541 1C117.552 1 123.575 2.80683 123.575 10.0341C123.575 17.2614 123.575 16.8097 123.575 19.0683"
                stroke="#D3D3C5" strokeWidth={strokeWidth} strokeLinecap="round"/>
            <motion.path
                d="M91.9556 19.2888L100.99 10.2547M100.99 10.2547L110.024 19.2888M100.99 10.2547V1.22058M91.9556 1.22058H100.99M110.024 1.22058H100.99"
                stroke="#D3D3C5" strokeWidth={strokeWidth} strokeLinecap="round"/>
            <motion.circle cx="10.6484" cy="10.2547" r="9.03413" stroke="#D3D3C5" strokeWidth={strokeWidth}
                           strokeLinecap="round"/>
            <motion.path
                d="M82.9214 10.0341H78.4043H73.8873M82.9214 10.0341C82.9214 2.80683 76.8987 1 73.8873 1M82.9214 10.0341V19.0683M73.8873 10.0341C73.8873 2.80683 67.8645 1 64.8531 1M73.8873 10.0341V19.0683"
                stroke="#D3D3C5" strokeWidth={strokeWidth} strokeLinecap="round"/>
            <motion.path
                d="M51.302 1.22058C52.8077 1.2205 55.819 2.12376 55.819 5.73752C55.819 9.35127 55.819 7.99631 55.819 10.2547M55.819 10.2547L46.7849 19.2887M55.819 10.2547L64.8532 19.2887"
                stroke="#D3D3C5" strokeWidth={strokeWidth} strokeLinecap="round"/>
            <motion.path
                d="M19.6825 28.323C19.6825 31.3344 21.4893 37.3571 28.7166 37.3571C35.9439 37.3571 37.7508 37.3571 38.88 37.3571"
                stroke="#D3D3C5" strokeWidth={strokeWidth} strokeLinecap="round"/>
            <motion.path
                d="M28.7167 1C31.7281 1 37.7508 2.80683 37.7508 10.0341C37.7508 17.2614 37.7508 15.304 37.7508 19.0683"
                stroke="#D3D3C5" strokeWidth={strokeWidth} strokeLinecap="round"/>
            <motion.circle cx="73.8873" cy="28.3229" r="9.03413" stroke="#D3D3C5" strokeWidth={strokeWidth}
                           strokeLinecap="round"/>
        </Svg>
    )
}

