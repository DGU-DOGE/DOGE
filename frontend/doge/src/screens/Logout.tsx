import { useSetRecoilState } from "recoil";
import { LoginState } from "../stores/atoms";
import { Link, useNavigate } from "react-router-dom";

// 이부분을 컴포넌트로 만들 것인지 아니면, 헤더에서 로그인 svg 클릭했을때 함수를 통해 처리해줄 것인지 정할 필요있음
const Logout = () => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(LoginState);
  setIsLogin(false);
  return <h1>Logout</h1>;
};

export default Logout;
