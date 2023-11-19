import { useSetRecoilState } from "recoil";
import { LoginState } from "../stores/atoms";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(LoginState);
  setIsLogin(false);
  return <h1>Logout</h1>;
};

export default Logout;
