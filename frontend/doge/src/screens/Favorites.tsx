import { ReactComponent as LeftAngle } from "../assets/imgs/angle-left-solid.svg";
import { ReactComponent as RightAngle } from "../assets/imgs/angle-right-solid.svg";
import { ReactComponent as CancelBtn } from "../assets/imgs/xmark-solid.svg";
import styled from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import { useQuery } from "react-query";
import { fetchUserData } from "../apis/api";

const Wrapper = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: column;
`;
const Banner = styled.div`
  min-width: 800px;
  display: flex;
  align-items: center;
  margin: 30px 30px;
`;
const Title = styled.h1`
  font-size: 28px;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 800px;
  background-color: ${(props) => props.theme.gray.lighter};
  border-radius: 10px;
  position: relative;
`;
const NoResult = styled.div`
  font-size: 45px;
  margin: 60px 30px;
`;
const Slider = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  div:last-child {
    margin-bottom: 80px;
  }
  position: relative;
  svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    padding-top: 5px;
    padding-right: 5px;
    cursor: pointer;
  }
`;
const Book = styled(motion.div)`
  display: flex;
  background-color: ${(props) => props.theme.gray.lightdark};
  width: 95%;
  height: 200px;
  margin: 20px 0px;
  border-radius: 7px;
  div {
    margin-top: 10px;
    margin-left: 20px;
  }
  cursor: pointer;
`;
const BookImg = styled.div`
  background-color: red;
  background-size: cover;
  background-position: center center;
  min-width: 180px;
  width: 180px;
  height: 180px;
`;
const BookInfo = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 180px;
  h1 {
    margin: 10px 15px;
    font-size: 27px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h1:first-child {
    margin-top: 20px;
    margin-bottom: 45px;
  }
  h1:last-child {
    color: rgba(0, 0, 0, 0.5);
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;
const DetailWrapper = styled(motion.div)`
  position: absolute;
  width: 80%;
  height: 90vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.gray.medium};
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.gray.bright};
  width: 70%;
  max-width: 500px;

  border-radius: 7px;
  h1,
  span {
    margin: 10px 10px;
    margin-left: 30px;
    font-size: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  h1:first-child {
    margin-top: 20px;
  }
  span {
    background-color: ${(props) => props.theme.orange};
    font-size: 12px;
    color: ${(props) => props.theme.white.lighter};
    width: 60px;
    text-align: center;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
  }
`;
const MapLocation = styled.div`
  align-items: center;
  background-color: red;
  width: 70%;
  height: 600px;
  max-width: 550px;
  margin: 20px 0px;

  img {
    background-size: cover;
    background-position: center center;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const Circle = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

const bookVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.03 },
};

const Favorites = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bookDetailMatch = useMatch(`/favorites/book-detail/:bookId`);
  const [detailIdx, setDetailIdx] = useState(0);
  const [isdetailNext, setIsDetailNext] = useState(true);
  const [detailLeaving, setDetailLeaving] = useState(false);
  //const {data, isLoading} = useQuery(["favorites"], fetchUserData);
  const data = [
    {
      id: 100,
      bookName: "국부론",
      language: "한국어",
      isbn: 0,
      author: "저자0",
      company: "com0",
      bookImg: "",
      floor: "지하1층",
      shelfname: "일반도서",
      loaction: { shelffloor: 0, shelfleft: 0 },
    },
    {
      id: 101,
      bookName: "공산당 선언",
      language: "한국어",
      isbn: 1,
      author: "저자1",
      company: "com1",
      bookImg: "",
      floor: "1층",
      shelfname: "책장 이름1",
      loaction: { shelffloor: 1, shelfleft: 1 },
    },
  ];
  const clickedBook =
    bookDetailMatch?.params.bookId &&
    data.find((book) => book.id + "" === bookDetailMatch.params.bookId);

  const increaseDetailIdx = () => {
    setIsDetailNext(true);
    setDetailIdx((prev) => (prev === 1 ? 0 : prev + 1));
  };
  const decreaseDetailIdx = () => {
    setIsDetailNext(false);
    setDetailIdx((prev) => (prev === 0 ? 1 : prev - 1));
  };
  const toggleDetailLeaving = () => {
    setDetailLeaving((prev) => !prev);
  };
  const onBookClick = (bookId: number) => {
    navigate(`/favorites/book-detail/${bookId}`);
  };
  const onOverlayClick = () => {
    setDetailIdx(0);
    navigate(-1);
  };

  // isLoading인 경우 Loader를, 아닌 경우에는 data의 개수에 따라 다른 컴포넌트를 출력한다.
  return (
    <Wrapper>
      {data.length === 0 ? (
        <>
          <Banner>
            <Title>즐겨찾기</Title>
          </Banner>
          <NoResult>
            <h1>즐겨찾기한 도서가 없습니다</h1>
          </NoResult>
        </>
      ) : (
        <>
          <Banner>
            <Title>즐겨찾기</Title>
          </Banner>
          <InfoWrapper>
            <AnimatePresence>
              <Slider key={0}>
                {data.slice(0, 5).map((book) => (
                  <Book
                    key={book.id}
                    layoutId={book.id + ""}
                    variants={bookVariants}
                    whileHover="hover"
                    onClick={() => onBookClick(book.id)}
                  >
                    <BookImg />
                    <BookInfo>
                      <h1>{book.bookName}</h1>
                      <h1>도서 위치 정보</h1>
                      <h1>
                        중앙도서관/{book.floor}/{book.shelfname}
                      </h1>
                    </BookInfo>
                  </Book>
                ))}
              </Slider>
            </AnimatePresence>
            <AnimatePresence
              onExitComplete={toggleDetailLeaving}
              initial={false}
            >
              {bookDetailMatch && (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    animate={{ opacity: 1, transition: { type: "tween" } }}
                    exit={{
                      opacity: 0,
                    }}
                  />
                  <DetailWrapper
                    layoutId={bookDetailMatch.params.bookId + ""}
                    style={{ top: scrollY.get() + 20 }}
                  >
                    <Slider key={detailIdx}>
                      <CancelBtn
                        onClick={() => {
                          setDetailIdx(0);
                          navigate(-1);
                        }}
                      />
                      {detailIdx === 0 ? (
                        <>
                          <div style={{ marginTop: 250 }}>
                            <BookImg
                              style={{
                                width: 450,
                                height: 450,
                                marginTop: 50,
                              }}
                            />
                          </div>
                          <DetailInfo>
                            {clickedBook && (
                              <>
                                <h1>{clickedBook.bookName}</h1>
                                <h1>저자명 : {clickedBook.author}</h1>
                                <h1>발행사항 : {clickedBook.company}</h1>
                                <h1>ISBN : {clickedBook.isbn}</h1>
                                <h1>언어 : {clickedBook.language}</h1>
                                <span onClick={increaseDetailIdx}>
                                  지도 보기
                                </span>
                                <RightAngle
                                  onClick={increaseDetailIdx}
                                  style={{
                                    position: "absolute",
                                    width: 70,
                                    height: 70,
                                    top: "50%",
                                  }}
                                />
                              </>
                            )}
                          </DetailInfo>
                          <Bottom>
                            {[0, 1].map((idx) => (
                              <Circle
                                key={idx}
                                style={{
                                  backgroundColor:
                                    idx === detailIdx ? "#898585" : "#C2C0C0",
                                }}
                              />
                            ))}
                          </Bottom>
                        </>
                      ) : (
                        <>
                          <MapLocation></MapLocation>
                          <DetailInfo>
                            {clickedBook && (
                              <>
                                <h1>도서관 {clickedBook.floor}</h1>
                                <h1>책장 이름 : {clickedBook.shelfname}</h1>
                                <h1>
                                  표시된 서가에서 :{" "}
                                  {clickedBook.loaction.shelffloor}층, 왼쪽에서{" "}
                                  {clickedBook.loaction.shelfleft}번째에
                                  존재합니다
                                </h1>
                                <LeftAngle
                                  onClick={decreaseDetailIdx}
                                  style={{
                                    position: "absolute",
                                    width: 70,
                                    height: 70,
                                    left: 0,
                                    top: "50%",
                                  }}
                                />
                              </>
                            )}
                          </DetailInfo>
                          <Bottom>
                            {[0, 1].map((idx) => (
                              <Circle
                                key={idx}
                                style={{
                                  backgroundColor:
                                    idx === detailIdx ? "#898585" : "#C2C0C0",
                                }}
                              />
                            ))}
                          </Bottom>
                        </>
                      )}
                    </Slider>
                  </DetailWrapper>
                </>
              )}
            </AnimatePresence>
          </InfoWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Favorites;
