import styled from "styled-components";

const Banner = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
`;
const SiteName = styled.div`
  width: 300px;
  height: 300px;
  background-color: red;
`;

const Home = () => {
  return (
    <Banner>
      <h1>home</h1>
    </Banner>
  );
};

export default Home;
