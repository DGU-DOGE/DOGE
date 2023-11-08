import { useForm } from "react-hook-form";
import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: column;
`;
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
    color: ${(props) => props.theme.orange};
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
  justify-content: center;
  align-items: center;
  input:focus {
    background-color: transparent;
  }
  input[type="submit"] {
    cursor: pointer;
    background-color: ${(props) => props.theme.orange};
    color: ${(props) => props.theme.white.lighter};
    font-size: 30px;
  }
`;
const Input = styled.input`
  width: 80%;
  height: 60px;
  margin: 10px;
  background-color: ${(props) => props.theme.gray.medium};
  border: 1px solid ${(props) => props.theme.gray.medium};
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
    color: ${(props) => props.theme.orange};
    margin-left: 10px;
    font-size: 22px;
  }
`;
interface ILogin {
  userId: string;
  userPassword: string;
}
const Login = () => {
  const { register, handleSubmit } = useForm<ILogin>();
  const onValid = (data: ILogin) => {
    console.log(data);
  };
  return (
    <Wrapper>
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
            {...register("userId", { required: true })}
            placeholder="이메일을 입력하세요"
          />
          <Input
            {...register("userPassword", { required: true })}
            placeholder="비밀번호를 입력하세요"
          />
          <Input type="submit" value="로그인" />
        </LoginForm>
      </LoginWrapper>
      <ExtraWrapper>
        <Extra>
          <Link to={"/"}>비밀번호 찾기</Link>
          <span>/</span>
          <Link to={"/join"}>회원가입</Link>
        </Extra>
      </ExtraWrapper>
    </Wrapper>
  );
};

export default Login;
