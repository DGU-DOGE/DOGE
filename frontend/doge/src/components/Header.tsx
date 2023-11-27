import { ReactComponent as HomeLogo } from "../assets/imgs/house-solid.svg";
import { ReactComponent as Logout } from "../assets/imgs/right-from-bracket-solid.svg";
import { ReactComponent as User } from "../assets/imgs/user-solid.svg";
import { ReactComponent as FullStar } from "../assets/imgs/star-solid.svg";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useMatch, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "../stores/atoms";
import axios from "axios";
import { useCookies } from "react-cookie";
import { removeCookie } from "../stores/Cookie";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 800px;
  top: 0;
  background-color: ${(props) => props.theme.orange};
  font-size: 24px;
  padding: 15px 20px;
  color: rgba(255, 255, 255, 1);
  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.white.lighter};
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
  color: ${(props) => props.theme.white.darker};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  svg {
    cursor: pointer;
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
  background-color: ${(props) => props.theme.white.lighter};
`;
const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const HomeMatch = useMatch("/");
  const LoginMatch = useMatch("/login");
  const UserInfoMatch = useMatch("/userInfo");
  const FavoriteMatch = useMatch("/favorites");

  const handleLogout = () => {
    axios
      .post(
        "/api/user/logout",
        { sessionId: localStorage.getItem("sessionId") },
        { withCredentials: true }
      )
      .then((res) => {
        setIsLogin(false);
        console.log(localStorage.getItem("sessionId"));
        localStorage.removeItem("sessionId");
        removeCookie("sessionId");
        console.log("로그아웃 성공!");
        navigate(`/`);
      })
      .catch((err) => console.log("로그아웃 실패", err));
  };
  return (
    <Nav>
      <Col>
        <Items>
          <Item style={{ marginLeft: 15 }}>
            <Link to="/">
              <HomeLogo />
            </Link>
            {HomeMatch && <Circle layoutId="circle" />}
          </Item>
        </Items>
      </Col>
      <Col>
        <Items>
          {!isLogin ? (
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
                <Logout onClick={handleLogout} />
              </Item>
            </>
          )}
        </Items>
      </Col>
    </Nav>
  );
};

export default Header;
