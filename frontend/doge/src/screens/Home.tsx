import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import { ReactComponent as SearchIcon } from "../assets/imgs/magnifying-glass-solid.svg";
import FloorB2 from "../assets/imgs/floorB2.png";
import FloorB1 from "../assets/imgs/floorB1.png";
import Floor1 from "../assets/imgs/floor1.png";
import Floor3 from "../assets/imgs/floor3.png";
import { ReactComponent as LeftAngle } from "../assets/imgs/angle-left-solid.svg";
import { ReactComponent as RightAngle } from "../assets/imgs/angle-right-solid.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";

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
  justify-content: center;
  min-width: 800px;
  background-color: ${(props) => props.theme.gray.lighter};
  border-radius: 10px;
`;
const Search = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Input = styled.input`
  width: 95%;
  height: 70px;
  margin: 10px;
  background-color: ${(props) => props.theme.gray.medium};
  border: 1px solid ${(props) => props.theme.gray.medium};
  border-radius: 10px;
  padding: 10px;
  font-size: 28px;
`;
const SearchBtn = styled.div`
  svg {
    width: 50px;
    height: 50px;
  }
  position: absolute;
  right: 45px;
`;
const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 800px;
  margin-bottom: 20px;
  position: relative;
`;
const Map = styled(motion.img)`
  min-width: 800px;
  margin-top: 20px;
  height: 700px;
  background-size: cover;
  background-position: center center;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.span<{ current: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.current ? props.theme.gray.darker : props.theme.gray.medium};
  margin-right: 50px;
  margin-bottom: 50px;
`;
interface IForm {
  keyword: string;
}
const boxVariants = {
  initial: (isNext: boolean) => ({
    x: isNext ? window.outerWidth : -window.outerWidth,
  }),
  animate: { x: 0 },
  exit: (isNext: boolean) => ({
    x: isNext ? -window.outerWidth : window.outerWidth,
  }),
};
const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [next, setNext] = useState(true);
  const { register, handleSubmit } = useForm<IForm>();
  const increaseIndex = () => {
    if (leaving) return;
    setNext(true);
    toggleLeaving();
    setIndex((prev) => (prev === 3 ? 0 : prev + 1));
  };
  const decreaseIndex = () => {
    if (leaving) return;
    setNext(false);
    toggleLeaving();
    setIndex((prev) => (prev === 0 ? 3 : prev - 1));
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };
  return (
    <Wrapper>
      <Banner>
        <Title>
          <h1>
            동국대학교 <br />
            중앙<span>도</span>서관 <span>지</span>도 <br />
            <span>도지</span>
          </h1>
        </Title>
        <BannerLogo>
          <ElephantLogo />
        </BannerLogo>
      </Banner>
      <InfoWrapper>
        <Search onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("keyword", { required: true })}
            placeholder="도서명 또는 저자를 검색하세요."
          />
          <SearchBtn>
            <SearchIcon />
          </SearchBtn>
        </Search>
        <MapWrapper>
          <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
            <Map
              key={index}
              custom={next}
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween", duration: 0.2 }}
              src={
                index === 0
                  ? FloorB2
                  : index === 1
                  ? FloorB1
                  : index === 2
                  ? Floor1
                  : Floor3
              }
            />
          </AnimatePresence>
          <LeftAngle
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              left: 0,
              cursor: "pointer",
            }}
            onClick={decreaseIndex}
          />
          <RightAngle
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              right: 0,
              cursor: "pointer",
            }}
            onClick={increaseIndex}
          />
        </MapWrapper>
        <Bottom>
          {[0, 1, 2, 3].map((idx) => (
            <Circle current={index === idx} />
          ))}
        </Bottom>
      </InfoWrapper>
    </Wrapper>
  );
};

export default Home;
