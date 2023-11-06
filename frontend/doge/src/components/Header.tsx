import { ReactComponent as Logo } from "../assets/img/dgu-elephant.svg";
import { ReactComponent as Home } from "../assets/img/house-solid.svg";
import { ReactComponent as Logout } from "../assets/img/right-from-bracket-solid.svg";
import { ReactComponent as Star } from "../assets/img/star-regular.svg";
import { ReactComponent as FullStar } from "../assets/img/star-solid.svg";
import { ReactComponent as User } from "../assets/img/user-solid.svg";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: 0;
  background-color: ${(props) => props.theme.orange};
  font-size: 14px;
  padding: 20px 60px;
  color: rgba(255, 255, 255, 1);
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Header = () => {
  return <Nav>header</Nav>;
};

export default Header;
