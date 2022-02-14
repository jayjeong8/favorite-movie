import {Link, useMatch, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {motion, useAnimation, useViewportScroll} from "framer-motion";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import FavoriteLogo from "../assets/FavoriteLogo"

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 12px;
  padding: 24px 64px;
  color: white;
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
const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;

  svg {
    height: 24px;
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  bottom: -4px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
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
  border: 1px solid ${(props) => props.theme.white.lighter};
  ::placeholder {
    color: rgba(255, 255, 255, 0.8);
  };
`;

const navVariants = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
        backgroundColor: "rgba(0, 0, 0, 1)",
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
                    <Item>
                        <Link to="/">MOVIE {homeMatch && <Circle layoutId="circle"/>}</Link>
                    </Item>
                    <Item>
                        <Link to="/tv">TV Show {tvMatch && <Circle layoutId="circle"/>}</Link>
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