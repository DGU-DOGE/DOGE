import { removeCookie } from "../stores/Cookie";
import { useNavigate } from "react-router-dom";
import { fetchDeleteUser } from "../apis/api";
import { LoginState } from "../stores/atoms";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import PageBanner from "../components/PageBanner";

export interface IDelete {
  password: string;
}
const DeleteAccount = () => {
  const setIsLogin = useSetRecoilState(LoginState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDelete>({ mode: "onSubmit" });

  const { mutate: deleteUser } = useMutation(fetchDeleteUser);
  const onValid = async (data: IDelete) => {
    try {
      deleteUser(
        { password: data.password },
        {
          onSuccess: () => {
            setIsLogin(false);
            localStorage.removeItem("sessionId");
            removeCookie("sessionId");
            navigate(`/`);
          },
        }
      );
    } catch (error) {
      console.log("회원탈퇴 에러발생!", error);
    }
  };

  return (
    <>
      <Wrapper>
        <PageBanner>
          <h1>
            동국대학교 <br />
            중앙<span>도</span>서관 <span>지</span>도 <br />
            <span>도지 회원탈퇴</span>
          </h1>
        </PageBanner>
        <DeleteWrapper>
          <DeleteMessage>
            <h1>
              정말 도지를
              <br /> <span>탈퇴</span>하시나요
            </h1>
            <p>탈퇴를 원하시면 사용중인 비밀번호를 입력해주세요</p>
          </DeleteMessage>
          <DeleteForm onSubmit={handleSubmit(onValid)}>
            <Input
              type="password"
              placeholder="비밀번호"
              {...register("password", { required: "비밀번호를 입력하세요" })}
            />
            {errors.password && errors.password.type === "required" && (
              <AlertMessage>{errors.password.message}</AlertMessage>
            )}
            <Input type="submit" value="회원 탈퇴" />
          </DeleteForm>
        </DeleteWrapper>
      </Wrapper>
    </>
  );
};

export default DeleteAccount;

const Wrapper = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: column;
`;
const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const DeleteMessage = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 100%;
  padding-left: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
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
  width: 90%;
  height: 60px;
  margin: 10px;
  background-color: ${(props) => props.theme.gray.medium};
  border: 1px solid ${(props) => props.theme.gray.medium};
  border-radius: 10px;
  padding: 10px;
  font-size: 24px;
`;

const AlertMessage = styled.span`
  width: 80%;
  margin-left: 23px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.orange};
  font-size: 20px;
`;
