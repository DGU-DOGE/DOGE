import { ReactNode } from "react";
import { styled } from "styled-components";

type AlertType = {
  children: ReactNode;
};
const Alert = ({ children }: AlertType) => {
  return <AlertMessage>{children}</AlertMessage>;
};

export default Alert;

const AlertMessage = styled.span`
  width: 80%;
  margin-left: 23px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.orange};
  font-size: 20px;
`;
