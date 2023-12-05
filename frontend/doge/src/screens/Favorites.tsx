import { ReactComponent as LeftAngle } from "../assets/imgs/angle-left-solid.svg";
import { ReactComponent as RightAngle } from "../assets/imgs/angle-right-solid.svg";
import { ReactComponent as CancelBtn } from "../assets/imgs/xmark-solid.svg";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { IBook, fetchAddFavorite, fetchDeleteFavorite } from "../apis/api";
import { getCookie } from "../stores/Cookie";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MapPath from "../utils/MapPath";
import { formatFloor, formatShelfName } from "../utils/formatPath";
import { useMutation } from "react-query";
import Container from "../components/Container";

const Favorites = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [detailIdx, setDetailIdx] = useState(0);
  const [isdetailNext, setIsDetailNext] = useState(true);
  const [detailLeaving, setDetailLeaving] = useState(false);
  const [clickedBook, setClickedBook] = useState<IBook>();
  const [favoriteList, setFavoriteList] = useState<IBook[]>([]);
  const bookDetailMatch = useMatch(`/favorites/book-detail/:bookId`);

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
    navigate(-1);
  };

  // 즐겨찾기 조회
  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        "/api/favorite/check",
        { sessionId: localStorage.getItem("sessionId") },
        {
          headers: {
            sessionId: await getCookie("sessionId"),
          },
          withCredentials: true,
        }
      );
      setFavoriteList(data);
    })();
  }, []);
  useEffect(() => {
    setDetailIdx(0);
    if (bookDetailMatch?.params.bookId && favoriteList) {
      setClickedBook(
        favoriteList.find(
          (book) => book.bookId + "" === bookDetailMatch.params.bookId
        )
      );
    }
  }, [bookDetailMatch]);

  // 즐겨찾기 등록
  const { mutate: registerFavorite } = useMutation(fetchAddFavorite);
  const addFavorite = async (favoriteData: IBook) => {
    try {
      registerFavorite(favoriteData, {
        onSuccess: () => {
          setFavoriteList((prev) => [...prev, favoriteData]);
          console.log("즐겨찾기 등록 후 즐겨찾기 목록", favoriteList);
        },
        onError: (err) => {
          console.log("즐겨찾기 등록 실패!", err);
        },
      });
    } catch (err) {
      console.log("즐겨찾기 등록 실패!", err);
    }
  };
  // 즐겨찾기 삭제
  const { mutate: deleteFavoriteBook } = useMutation(fetchDeleteFavorite);
  const deleteFavorite = async (deleteData: IBook) => {
    try {
      deleteFavoriteBook(deleteData, {
        onSuccess: () => {
          setFavoriteList((prev) => {
            const newFavorite = prev.filter(
              (book) => book.bookId !== deleteData.bookId
            );
            console.log("즐겨찾기 삭제 후 즐겨찾기 목록", newFavorite);
            return newFavorite;
          });
        },
        onError: (err) => {
          console.log("즐겨 찾기 삭제 실패!", err);
        },
      });
    } catch (err) {
      console.log("즐겨 찾기 삭제 실패!", err);
    }
  };

  return (
    <Container>
      {favoriteList.length === 0 ? (
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
                {favoriteList.slice(0, 5).map((book) => (
                  <Book
                    key={book.bookId}
                    layoutId={book.bookId + ""}
                    variants={bookVariants}
                    whileHover="hover"
                    onClick={() => onBookClick(book.bookId!)}
                  >
                    <BookImg
                      src={book.photoLink}
                      style={{ paddingLeft: "12px", paddingTop: "18px" }}
                    />
                    <BookInfo>
                      <h1>{book.bookName}</h1>
                      <h1>도서 위치 정보</h1>
                      <h1>
                        중앙도서관/{book.floor}/{book.shelfName}
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
                              src={clickedBook?.photoLink}
                              style={{
                                width: 400,
                                height: 400,
                                marginTop: 50,
                                marginBottom: 20,
                              }}
                            />
                          </div>
                          <DetailInfo>
                            {clickedBook && (
                              <>
                                <h1>{clickedBook.bookName}</h1>
                                <h1>저자명 : {clickedBook.author}</h1>
                                <h1>발행사항 : {clickedBook.publisher}</h1>
                                <h1>청구기호 : {clickedBook.callNumber}</h1>
                                <div>
                                  <span onClick={increaseDetailIdx}>
                                    지도 보기
                                  </span>
                                  {favoriteList?.find(
                                    (book) => book.bookId === clickedBook.bookId
                                  ) ? (
                                    <span
                                      onClick={() =>
                                        deleteFavorite(clickedBook)
                                      }
                                    >
                                      즐겨 찾기 삭제
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() => addFavorite(clickedBook)}
                                    >
                                      즐겨 찾기 추가
                                    </span>
                                  )}
                                </div>
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
                          <MapLocation>
                            {clickedBook && (
                              <MapPath
                                floor={formatFloor(clickedBook.floor)}
                                shelfname={formatShelfName(
                                  clickedBook.shelfName
                                )}
                                shelfnum={0}
                              />
                            )}
                          </MapLocation>
                          <DetailInfo>
                            {clickedBook && (
                              <>
                                <h1>도서관 {clickedBook.floor}</h1>
                                <h1>책장 이름 : {clickedBook.shelfName}</h1>
                                <h1>
                                  표시된 서가에서 : {clickedBook.bookRow}층,
                                  왼쪽에서 {clickedBook.bookCell}번째에
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
    </Container>
  );
};

export default Favorites;

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
const BookImg = styled.img`
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
  height: 140vh;
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
    margin: 10px 0px;
    margin-left: 30px;
    font-size: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  h1:first-child {
    margin-top: 20px;
  }
  div {
    display: flex;
    margin-bottom: 15px;
    span {
      background-color: ${(props) => props.theme.orange};
      font-size: 13px;
      color: ${(props) => props.theme.white.lighter};
      width: 60px;
      text-align: center;
      padding: 3px;
      border-radius: 3px;
      cursor: pointer;
    }
    span:nth-child(2) {
      width: 80px;
    }
  }
`;
const MapLocation = styled.div`
  align-items: center;
  width: 450px;
  height: 600px;
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
