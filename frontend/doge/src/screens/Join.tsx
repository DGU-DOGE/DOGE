import styled from "styled-components";

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Submit = styled.div`
  width: 80%;
  height: 60px;
  margin: 10px;
  background-color: ${(props) => props.theme.orange};
  border: 1px solid ${(props) => props.theme.orange};
  border-radius: 10px;

  font-size: 24px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.white.lighter};
    font-size: 24px;
    padding-top: 13px;
  }
`;

const Join = () => {
  return <h1>Join</h1>;
};

export default Join;
