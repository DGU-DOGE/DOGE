import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilState } from "recoil";
import { LoginState } from "../stores/atoms";
import { removeCookie } from "../stores/Cookie";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
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
    color: ${props => props.theme.orange};
  }
`;
const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 50px;
    margin-left: 100px;
    margin-top: 100px;
    span {
      color: ${props => props.theme.red};
    }
  }
  p {
    font-size: 20px;
    margin-top: 20px;
    margin-left: 100px;
  }
`;

interface IDelete {
  password: string;
}
const DeleteAccount = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data: IDelete) => {
    axios
      .post(`/api/user/delete`)
      .then(res => {
        console.log("회원 탈퇴 성공");
        setIsLogin(false);
        localStorage.removeItem("sessionId");
        removeCookie("sessionId");
        navigate(`/`);
      })
      .catch(err => console.log("회원탈퇴 실패", err));
  };
  return (
    <>
      <Wrapper>
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
        </DeleteWrapper>
      </Wrapper>
    </>
  );
};

export default DeleteAccount;
