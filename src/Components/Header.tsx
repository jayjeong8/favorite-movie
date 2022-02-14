import {Link, useMatch, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {motion, useAnimation, useViewportScroll} from "framer-motion";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import FavoriteLogo from "../Assets/FavoriteLogo"
import {COLOR_BLACK, COLOR_DARKYELLOW, COLOR_ZEROBLACK} from "../theme";

const Nav = styled(motion.nav)`
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
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled(motion.li)`
  margin-right: 24px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  &:hover {
    color: ${(props) => props.theme.gray.light};
  }

  &:focus {
    color: ${(props) => props.theme.black};
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  z-index: -1;
  width: 64px;
  height: 24px;
  border-radius: 15px;
  top: -3px;
  right: 0;
  //margin: 0 auto;
  background-color: ${(props) => props.theme.yellow.light};
`;
const MovieCircle = styled(Circle)`
  left: -12px;
`;
const TVCircle = styled(Circle)`
  left: -7px;
`;
const Search = styled.form`
  color: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  position: relative;

  svg {
    height: 20px;
    padding-left: 4px;
  }
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -184px;
  right: 0;
  padding: 4px 8px 4px 40px;
  width: 216px;
  z-index: -1;
  color: white;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.gray.gray};

  ::placeholder {
    color: ${(props) => props.theme.gray.gray};
  }
;
`;

const navVariants = {
    top: {
        backgroundColor: COLOR_ZEROBLACK,
    },
    scroll: {
        backgroundColor: COLOR_BLACK,
    },
};

interface IForm {
    keyword: string;
}

function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const homeMatch = useMatch("/");
    const tvMatch = useMatch("/tv");
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
                    <Item style={{color: homeMatch ? COLOR_BLACK : COLOR_DARKYELLOW}}>
                        <Link to="/">MOVIE {homeMatch  && <MovieCircle layoutId="circle"/>}</Link>
                    </Item>
                    <Item style={{color: tvMatch ? COLOR_BLACK : COLOR_DARKYELLOW}}>
                        <Link to="/tv">TV Show {tvMatch && <TVCircle layoutId="circle"/>}</Link>
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