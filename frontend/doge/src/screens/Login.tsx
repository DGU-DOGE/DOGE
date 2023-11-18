import { useForm } from "react-hook-form";
import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { fetchLogin } from "../apis/api";

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
const AlertMessage = styled.span`
  width: 80%;
  margin-left: 23px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.orange};
  font-size: 20px;
`;
interface ILogin {
  userId: string;
  userPassword: string;
}

const Login = () => {
  // atoms.tsx에서 로그인 상태에 대한 변수를 가져온다음, 로그인이 성공적으로 이루어졌을경우
  // 해당값을 true로 설정해주는 과정 필요
  const { mutate, isLoading, data } = useMutation(fetchLogin, {
    onSuccess: (data) => {
      //로그인 성공 시 실행되는 부분
      // 서버에서 받은 토큰을 저장하고 로그인 상태를 전역적으로 관리하여야 함.
      //localStorage.setItem("accessToken", data.accessToken);
      // atom.tsx의 Login상태 변경 하는 코드필요
    },
    onError: (data) => {
      console.log(`로그인 실패`);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ mode: "onSubmit" });
  const onValid = (data: ILogin) => {
    console.log(data);
    /*
    try{
      await mutate(data);
    }
    catch(error){
      console.error("로그인 실패", error);
    }
    */
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
            {...register("userId", { required: "이메일을 입력해주세요" })}
            placeholder="이메일을 입력하세요"
          />
          {errors.userId && errors.userId.type === "required" && (
            <AlertMessage>{errors.userId.message}</AlertMessage>
          )}
          <Input
            {...register("userPassword", {
              required: "비밀번호를 입력해주세요",
            })}
            placeholder="비밀번호를 입력하세요"
          />
          {errors.userPassword && errors.userPassword.type === "required" && (
            <AlertMessage>{errors.userPassword.message}</AlertMessage>
          )}
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
