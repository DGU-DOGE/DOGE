import { useNavigate } from "react-router-dom";
import { getCookie } from "../stores/Cookie";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PageBanner from "../components/PageBanner";
import Container from "../components/Container";

const UserInfo = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    (async () => {
      axios
        .post(`/api/user/check`, {
          headers: {
            sessionId: await getCookie("sessionId"),
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log("사용자 email 받아오기 성공!");
          setUserEmail(res.data.email);
        })
        .catch((err) => console.log("사용자 email 받아오기 실패!"));
    })();
  }, []);

  const handleFavorite = () => {
    navigate("/favorites");
  };
  const handleDeleteUser = () => {
    navigate(`/delete-account`);
  };

  return (
    <>
      <Container>
        <PageBanner>
          <h1>
            동국대학교 <br />
            중앙<span>도</span>서관 <span>지</span>도 <br />
            <span>도지 회원정보</span>
          </h1>
        </PageBanner>
      </Container>
      <InfoWrapper>
        <Input
          value={userEmail}
          onClick={(event) => {
            event.currentTarget.blur();
          }}
          readOnly
        />
        <Input type="button" value={`즐겨찾기`} onClick={handleFavorite} />
        <Input type="button" value={`회원탈퇴`} onClick={handleDeleteUser} />
      </InfoWrapper>
    </>
  );
};

export default UserInfo;

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
