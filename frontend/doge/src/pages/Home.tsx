import { ReactComponent as SearchIcon } from "../assets/imgs/magnifying-glass-solid.svg";
import FloorB2 from "../assets/imgs/floorB2.png";
import { ReactComponent as LeftAngle } from "../assets/imgs/angle-left-solid.svg";
import { ReactComponent as RightAngle } from "../assets/imgs/angle-right-solid.svg";
import FloorB2Detail from "../assets/imgs/floorB2-detail.png";
import FloorB1Detail from "../assets/imgs/floorB1-detail.png";
import Floor1Detail from "../assets/imgs/floor1-detail.png";
import Floor3Detail from "../assets/imgs/floor3-detail.png";
import FloorB1 from "../assets/imgs/floorB1.png";
import Floor1 from "../assets/imgs/floor1.png";
import Floor3 from "../assets/imgs/floor3.png";
import { AnimatePresence, useScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import PageBanner from "../components/Banner";
import Alert from "../components/UI/Alert";
import Container from "../components/UI/Container";

interface IForm {
  keyword: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const detailMapMatch = useMatch(`/map-detail/:mapId`);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isNext, setNext] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: "onSubmit" });
  const map = [FloorB2, FloorB1, Floor1, Floor3];
  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setNext(true);
    setIndex(prev => (prev === 3 ? 0 : prev + 1));
  };
  const decreaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setNext(false);
    setIndex(prev => (prev === 0 ? 3 : prev - 1));
  };
  const toggleLeaving = () => {
    setLeaving(prev => !prev);
  };
  const onOverlayClick = () => {
    navigate(-1);
  };
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };
  return (
    <Container>
      <PageBanner>
        <h1>
          동국대학교 <br />
          중앙<span>도</span>서관 <span>지</span>도 <br />
          <span>도지</span>
        </h1>
      </PageBanner>
      <InfoWrapper>
        <Search onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("keyword", {
              required: "도서명 또는 저자를 입력해주세요",
              minLength: {
                value: 2,
                message: "검색어를 2자 이상 입력해주세요",
              },
            })}
            placeholder="도서명 또는 저자를 검색하세요."
          />
          <SearchBtn>
            <input type="submit" id="btnSubmit" style={{ display: "none" }} />
            <label htmlFor="btnSubmit">
              <SearchIcon style={{ cursor: "pointer" }} />
            </label>
          </SearchBtn>
        </Search>
        {errors.keyword && errors.keyword.type === "required" && (
          <Alert>{errors.keyword.message}</Alert>
        )}
        {errors.keyword && errors.keyword.type === "minLength" && (
          <Alert>{errors.keyword.message}</Alert>
        )}
        <MapWrapper>
          <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
            <Map
              key={index}
              layoutId={index + ""}
              whileHover="hover"
              custom={isNext}
              variants={mapVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween", duration: 0.2 }}
              onClick={() => navigate(`/map-detail/${index}`)}
              src={map[index]}
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
        <AnimatePresence>
          {detailMapMatch ? (
            <>
              <Overlay
                onClick={onOverlayClick}
                animate={{ opacity: 1, transition: { type: "tween" } }}
                exit={{
                  opacity: 0,
                }}
              />
              <DetailMap
                layoutId={detailMapMatch.params.mapId + ""}
                style={{ top: scrollY.get() + 100 }}
              >
                <DetailMapInfo
                  src={
                    +detailMapMatch.params.mapId! === 0
                      ? FloorB2Detail
                      : +detailMapMatch.params.mapId! === 1
                      ? FloorB1Detail
                      : +detailMapMatch.params.mapId! === 2
                      ? Floor1Detail
                      : +detailMapMatch.params.mapId! === 3
                      ? Floor3Detail
                      : ""
                  }
                />
              </DetailMap>
            </>
          ) : null}
        </AnimatePresence>
        <Bottom>
          {[0, 1, 2, 3].map(idx => (
            <Circle
              key={idx}
              style={{ backgroundColor: idx === index ? "#898585" : "#D9D9D9" }}
            />
          ))}
        </Bottom>
      </InfoWrapper>
    </Container>
  );
};

export default Home;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 800px;
  background-color: ${props => props.theme.gray.lighter};
  border-radius: 10px;
`;
const Search = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  input:focus {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
const Input = styled.input`
  width: 95%;
  height: 70px;
  margin: 10px;
  background-color: ${props => props.theme.gray.medium};
  border: 1px solid ${props => props.theme.gray.medium};
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
  margin-top: 40px;
  height: 60vh;
  cursor: pointer;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;
const Bottom = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 50px;
  margin-bottom: 50px;
`;
const DetailMap = styled(motion.div)`
  position: absolute;
  width: 60%;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.gray.darker};
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DetailMapInfo = styled.img`
  background-size: cover;
  background-position: center center;
  height: 70vh;
  padding: 30px 0px;
`;
const mapVariants = {
  initial: (isNext: boolean) => ({
    x: isNext ? window.outerWidth : -window.outerWidth,
  }),
  animate: { x: 0 },
  exit: (isNext: boolean) => ({
    x: isNext ? -window.outerWidth : window.outerWidth,
  }),
  hover: { scale: 1.15 },
};
