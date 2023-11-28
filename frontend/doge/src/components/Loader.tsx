import styled from "styled-components";
import SpinnerGif from "../assets/gifs/spinner.gif";

const Loader = () => {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={SpinnerGif} alt="로딩중" width="7%" />
    </Background>
  );
};

export default Loader;

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ffffffa7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const LoadingText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  color: black;
  margin-bottom: 30px;
`;
