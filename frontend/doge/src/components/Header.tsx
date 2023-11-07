import { ReactComponent as HomeLogo } from "../assets/imgs/house-solid.svg";
import { ReactComponent as Logout } from "../assets/imgs/right-from-bracket-solid.svg";
import { ReactComponent as User } from "../assets/imgs/user-solid.svg";
import { ReactComponent as Star } from "../assets/img/star-regular.svg";
import { ReactComponent as FullStar } from "../assets/imgs/star-solid.svg";
import { ReactComponent as Xmark } from "../assets/imgs/xmark-solid.svg";
import { ReactComponent as SearchLogo } from "../assets/img/magnifying-glass-solid.svg";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useMatch, Link } from "react-router-dom";
import { useState } from "react";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: 0;
  background-color: ${props => props.theme.orange};
  font-size: 18px;
  padding: 15px 20px;
  color: rgba(255, 255, 255, 1);
  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.white.lighter};
  }
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
  color: ${props => props.theme.white.darker};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    color: ${props => props.theme.white.lighter};
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -7px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.white.lighter};
`;
const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const HomeMatch = useMatch("/");
  const LoginMatch = useMatch("/login");
  const UserInfoMatch = useMatch("/userInfo");
  const FavoriteMatch = useMatch("/favorites");

  return (
    <Nav>
      <Col>
        <Items>
          <Item>
            <Link to="/">
              <HomeLogo />
            </Link>
            {HomeMatch && <Circle layoutId="circle" />}
          </Item>
        </Items>
      </Col>
      <Col>
        <Items>
          {true ? (
            <>
              <Item>
                <Link to="/login">Login</Link>
                {LoginMatch && <Circle layoutId="circle" />}
              </Item>
            </>
          ) : (
            <>
              <Item>
                <Link to="/favorites">
                  <FullStar />
                </Link>
                {FavoriteMatch && <Circle layoutId="circle" />}
              </Item>
              <Item>
                <Link to="userInfo">
                  <User />
                </Link>
                {UserInfoMatch && <Circle layoutId="circle" />}
              </Item>
              <Item>
                <Link to="/logout">
                  <Logout />
                </Link>
              </Item>
            </>
          )}
        </Items>
      </Col>
    </Nav>
  );
};

export default Header;
