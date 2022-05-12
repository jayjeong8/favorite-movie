import {Link, useMatch, useNavigate} from "react-router-dom";
import {motion, useAnimation, useViewportScroll} from "framer-motion";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import FavoriteLogo from "../Assets/FavoriteLogo"
import {COLOR_BLACK, COLOR_ZEROBLACK, COLOR_YELLOW, COLOR_WHITE} from "../theme";
import {Nav, Col, Filters, Filter, MovieCircle, TVCircle, FavoriteCircle, Search, Input} from "../Styled/StyledHeader";
import {IForm} from "../interface";

const navVariants = {
    top: {
        backgroundColor: COLOR_ZEROBLACK,
    },
    scroll: {
        backgroundColor: COLOR_BLACK,
    },
};

function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const homeMatch = useMatch("/");
    const tvMatch = useMatch("/tv");
    const favoriteMatch = useMatch("/favorite");
    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();
    const {scrollY} = useViewportScroll();
    const toggleSearch = () => {
        if (searchOpen) {
            inputAnimation.start({scaleX: 0});
        } else {
            inputAnimation.start({scaleX: 1});
        }
        setSearchOpen((prev) => !prev);
    };

    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 80) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top");
            }
        });
    }, [scrollY, navAnimation]);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<IForm>();
    const onValid = (data: IForm) => {
        navigate(`/search?keyword=${data.keyword}`);
    };

    return (
        <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
            <Col>
                <FavoriteLogo/>
                <Items>
                    <Item>
                        <Link to="/">MOVIE
                            {<MovieCircle style={{backgroundColor: homeMatch ? COLOR_YELLOW : COLOR_ZEROBLACK}}/>}
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/tv">TV
                            {<TVCircle style={{backgroundColor: tvMatch ? COLOR_YELLOW : COLOR_ZEROBLACK}}/>}
                        </Link>
                    </Item>
                    <div style={{color: COLOR_WHITE, marginRight: '32px'}}>|</div>
                    <Item>
                        <Link to="/favorite">MY FAVORITE
                            {<FavoriteCircle style={{backgroundColor: favoriteMatch ? COLOR_YELLOW : COLOR_ZEROBLACK}}/>}
                        </Link>
                    </Item>
                </Items>
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onValid)}>
                    <motion.svg
                        onClick={toggleSearch}
                        animate={{x: searchOpen ? -184 : 0}}
                        transition={{type: "linear"}}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <Input
                        {...register("keyword", {required: true, minLength: 1})}
                        transition={{type: "linear"}}
                        initial={{scaleX: 0}}
                        animate={inputAnimation}
                        placeholder="Search for Movie or TV show.."
                    />
                </Search>
            </Col>
        </Nav>
    )
}

export default Header;