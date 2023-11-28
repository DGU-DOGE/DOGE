import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import { getCookie, removeCookie } from "../stores/Cookie";
import { useNavigate } from "react-router-dom";
import { fetchDeleteUser } from "../apis/api";
import { LoginState } from "../stores/atoms";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import axios from "axios";

export interface IDelete {
  password: string;
}
const DeleteAccount = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDelete>();

  const { mutate: deleteUser } = useMutation(
    (data: IDelete) => fetchDeleteUser(data),
    {
      onSuccess: () => {
        setIsLogin(false);
        localStorage.removeItem("sessionId");
        removeCookie("sessionId");
        navigate(`/`);
      },
    }
  );
  const onValid = async (data: IDelete) => {
    try {
      deleteUser({ password: data.password });
    } catch (error) {
      console.log("회원탈퇴 에러발생!", error);
    }
  };
  return (
    <>
      <Container>
        <Banner>
          <Title>
            <h1>
              동국대학교 <br />
              중앙<span>도</span>서관 <span>지</span>도 <br />
              <span>도지 회원탈퇴</span>
            </h1>
          </Title>
          <BannerLogo>
            <ElephantLogo />
          </BannerLogo>
        </Banner>
        <DeleteWrapper>
          <h1>
            정말 도지를
            <br /> <span>탈퇴</span>하시나요
          </h1>
          <p>탈퇴를 원하시면 사용중인 비밀번호를 입력해주세요</p>
          <DeleteForm onSubmit={handleSubmit(onValid)}>
            <Input
              type="password"
              placeholder="비밀번호"
              {...register("password", { required: true })}
            />
            <Input type="submit" value="회원 탈퇴" />
          </DeleteForm>
        </DeleteWrapper>
      </Container>
    </>
  );
};

export default DeleteAccount;

const Container = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: column;
`;
const Banner = styled.div`
  min-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BannerLogo = styled.div`
  svg {
    width: 300px;
    height: 300px;
    margin-top: 20px;
  }
  margin-right: 25px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 25px;
  h1 {
    font-size: 68px;
  }
  span {
    color: ${(props) => props.theme.orange};
  }
`;
const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 800px;
  h1 {
    font-size: 50px;
    margin-left: 100px;
    margin-top: 100px;
    span {
      color: ${(props) => props.theme.red};
    }
  }
  p {
    font-size: 24px;
    margin-top: 20px;
    margin-left: 100px;
  }
`;

const DeleteForm = styled.form`
  position: relative;
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
  padding-top: 70px;
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
