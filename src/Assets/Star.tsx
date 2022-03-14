import {motion} from "framer-motion";
import styled from "styled-components";
import {COLOR_YELLOW} from "../theme";
import {useRecoilState} from "recoil";
import {useEffect} from "react";
import {FavoriteMovie, FavoriteTV} from "../atom";
import {IStar, IContent} from "../interface";

const Svg = styled(motion.div)`
  cursor: pointer;
  filter: drop-shadow(0 0.6px 0.6rem ${props => props.theme.black});
`;

const logoVariants = {
    normal: {strokeOpacity: 1},
    active: {
        strokeOpacity: [0, 1, 0],
        transition: {repeat: Infinity}
    },
}

export default function Star({content, color, checkMedia}: IStar) {
    const [favoriteMovie, setFavoriteMovie] = useRecoilState(FavoriteMovie);
    const [favoriteTV, setFavoriteTV] = useRecoilState(FavoriteTV);
    useEffect(() => {
        window.localStorage.setItem("savedFavoriteMovie", JSON.stringify(favoriteMovie));
    }, [favoriteMovie]);
    useEffect(() => {
        window.localStorage.setItem("savedFavoriteTV", JSON.stringify(favoriteTV));
    }, [favoriteTV]);
    let addArray: boolean = false;
    const onStarClick = (content: IContent) => {
        addArray = true;
        if (checkMedia === "MOVIE") {
            let array = [...favoriteMovie];
            array.map((data, index) => {
                if (data.id === content.id) {
                    array.splice(index, 1);
                    addArray = false;
                }
            });
            if (addArray) {
                setFavoriteMovie(() => [content, ...array])
            } else if (!addArray) {
                setFavoriteMovie(() => [...array])
            }
        } else if (checkMedia === "TV"){
                let array = [...favoriteTV];
                array.map((data, index) => {
                    if (data.id === content.id) {
                        array.splice(index, 1);
                        addArray = false;
                    }
                });
                if (addArray) {
                    setFavoriteTV(() => [content, ...array])
                } else if (!addArray) {
                    setFavoriteTV(() => [...array])
                }
            }
        }

    return (
        <Svg
            variants={logoVariants}
            animate="normal"
            whileHover="active"
            onClick={() => onStarClick(content)}
        >
            <svg width="18" height="24" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.49185 19.4025C7.29718 12.3666 3.64859 10 -4.37114e-07 10C2.5 10 7.5 10 7.5 -3.27835e-07C7.5 10 12.5 10 15 10C8.10066 10 7.49814 16.7335 7.49185 19.4025C7.49726 19.598 7.5 19.7972 7.5 20C7.49527 19.8364 7.4913 19.6348 7.49185 19.4025Z"
                    fill={color}
                    stroke={COLOR_YELLOW}
                    strokeWidth="0.8"
                    strokeLinecap="round"
                />
            </svg>
        </Svg>
    )
}