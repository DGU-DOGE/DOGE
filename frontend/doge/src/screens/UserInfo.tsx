import { useNavigate } from "react-router-dom";
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
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 800px;

  input:first-child {
    margin: 80px;
  }
  input[type="button"] {
    background-color: ${(props) => props.theme.orange};
    color: ${(props) => props.theme.white.darker};
    cursor: pointer;
  }
`;
const Input = styled.input`
  width: 80%;
  height: 60px;
  margin: 10px;
  background-color: ${(props) => props.theme.yellow};
  border: 1px solid ${(props) => props.theme.yellow};
  border-radius: 10px;
  padding: 10px;
  font-size: 24px;
`;

const UserInfo = () => {
  const navigate = useNavigate();
  const userEmail = "2019112056@dongguk.edu"; // 유저로 부터 받을 이메일 예시
  // api.ts에서 fetchUserData로 부터 유저의 정보(유저 이메일, 즐겨찾기 목록 등)를 가져와서 화면에 보여주는 코드 필요
  // 회원 정보 화면에는 즐겨찾기로 갈 수 있도록 하는 버튼과, 회원 탈퇴 버튼을 만들어 주고,
  // 회원 탈퇴 버튼 클릭시 회원탈퇴 url로 유저의 아이디를 보낸다. (navigate의 state속성?)
  // 회원 탈퇴 화면에서는 url로 부터 유저의 id를 얻고, 입력한 비밀번호를 백엔드에서 줄 회원 delete api로 보낸다.
  // 해당 delete api요청이 성공적으로 이루어졌을 경우에는 atom.tsx에서 로그인된 상태를 false로 바꾸고, localStorage에 accessToken이 있을 경우, 해당 accessToken값을 제거해준다
  const handleFavorite = () => {
    navigate("/favorites");
  };
  const handleDeleteUser = () => {
    navigate("/delete-account", { state: { email: "hello" } }); // useQuery를 통해 얻은 유저의 이메일로 대체해야함
  };
  return (
    <>
      <Wrapper>
        <Banner>
          <Title>
            <h1>
              동국대학교 <br />
              중앙<span>도</span>서관 <span>지</span>도 <br />
              <span>도지 회원정보</span>
            </h1>
          </Title>
          <BannerLogo>
            <ElephantLogo />
          </BannerLogo>
        </Banner>
      </Wrapper>
      <InfoWrapper>
        <Input
          value={userEmail}
          readOnly
          onClick={(event) => {
            event.currentTarget.blur();
          }}
        />
        <Input type="button" value={`즐겨찾기`} onClick={handleFavorite} />
        <Input type="button" value={`회원탈퇴`} onClick={handleDeleteUser} />
      </InfoWrapper>
    </>
  );
};

export default UserInfo;
