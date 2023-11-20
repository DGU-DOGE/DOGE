import { useLocation } from "react-router-dom";
import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import styled from "styled-components";

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
    color: ${(props) => props.theme.orange};
  }
`;

const DeleteAccount = () => {
  const location = useLocation();
  const userId = location.state?.email;
  // 유저 탈퇴에 관한 fetchFn이랑 연결필요
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
      </Wrapper>
    </>
  );
};

export default DeleteAccount;
