import { ReactNode } from "react";
import styled from "styled-components";

type ContainerProps = {
  children: ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;

const Wrapper = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: column;
`;
