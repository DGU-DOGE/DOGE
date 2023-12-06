import { useForm } from "react-hook-form";
import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginState } from "../stores/atoms";
import { setCookie } from "../stores/Cookie";
import Alert from "../components/UI/Alert";
import Container from "../components/UI/Container";
import axios from "axios";

interface ILogin {
  userId: string;
  userPassword: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ mode: "onSubmit" });

  const onValid = async (data: ILogin) => {
    axios
      .post(
        `/api/user/login`,
        { email: data.userId, password: data.userPassword },
        { withCredentials: true }
      )
      .then(res => {
        localStorage.setItem("sessionId", res.data.sessionId);
        setCookie("sessionId", res.data.sessionId);
        setIsLogin(true);
        navigate(`/`);
      })
      .catch(err => {
        console.log("로그인 실패", err);
      });
  };

  return (
    <Container>
      <Banner>
        <BannerLogo>
          <ElephantLogo />
        </BannerLogo>
        <Title>
          <h1>로그인</h1>
        </Title>
      </Banner>
      <LoginWrapper>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("userId", {
              required: "이메일을 입력해주세요",
              pattern: {
                value:
                  /^(.+)@(dongguk\.edu|dgu\.edu|mail\.dgu\.edu|mail\.dongguk\.edu|dgu\.ac\.kr)$/,
                message: "올바른 동국대학교 이메일 형식을 입력해주세요",
              },
            })}
            placeholder="이메일을 입력하세요"
          />
          {errors.userId && errors.userId.type === "required" && (
            <Alert>{errors.userId.message}</Alert>
          )}
          {errors.userId && errors.userId.type === "pattern" && (
            <Alert>{errors.userId.message}</Alert>
          )}
          <Input
            type="password"
            {...register("userPassword", {
              required: "비밀번호를 입력해주세요",
            })}
            placeholder="비밀번호를 입력하세요"
          />
          {errors.userPassword && errors.userPassword.type === "required" && (
            <Alert>{errors.userPassword.message}</Alert>
          )}
          <Input type="submit" value="로그인" />
        </LoginForm>
      </LoginWrapper>
      <ExtraWrapper>
        <Extra>
          <Link to={"/find-password"}>비밀번호 찾기</Link>
          <span>/</span>
          <Link to={"/join"}>회원가입</Link>
        </Extra>
      </ExtraWrapper>
    </Container>
  );
};

export default Login;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BannerLogo = styled.div`
  svg {
    width: 300px;
    height: 300px;
    margin-top: 20px;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  h1 {
    font-size: 68px;
    color: ${props => props.theme.orange};
  }
`;
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 800px;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input:focus {
    background-color: transparent;
  }
  input[type="submit"] {
    cursor: pointer;
    background-color: ${props => props.theme.orange};
    color: ${props => props.theme.white.lighter};
    font-size: 30px;
  }
`;
const Input = styled.input`
  width: 80%;
  height: 60px;
  margin: 10px;
  background-color: ${props => props.theme.gray.medium};
  border: 1px solid ${props => props.theme.gray.medium};
  border-radius: 10px;
  padding: 10px;
  font-size: 24px;
`;
const ExtraWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 800px;
`;
const Extra = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  a,
  span {
    color: ${props => props.theme.orange};
    margin-left: 10px;
    font-size: 22px;
  }
`;
