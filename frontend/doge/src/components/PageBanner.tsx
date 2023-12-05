import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import styled from "styled-components";
import { ReactNode } from "react";

type PageBannerProps = {
  children: ReactNode;
};

const PageBanner = ({ children }: PageBannerProps) => {
  return (
    <Banner>
      <Title>{children}</Title>
      <BannerLogo>
        <ElephantLogo />
      </BannerLogo>
    </Banner>
  );
};

export default PageBanner;

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
