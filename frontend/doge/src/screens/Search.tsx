import { ReactComponent as SearchIcon } from "../assets/imgs/magnifying-glass-solid.svg";
import { ReactComponent as LeftArrow } from "../assets/imgs/arrow-left-solid.svg";
import { ReactComponent as RightArrow } from "../assets/imgs/arrow-right-solid.svg";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Loader from "../components/Loader";

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
  background-color: ${props => props.theme.gray.lighter};
  border-radius: 10px;
`;
const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  input:focus {
    background-color: rgba(255, 255, 255, 0.5);
  }
  padding-top: 20px;
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
  flex-direction: column;
  min-width: 800px;
  margin-bottom: 20px;
  position: relative;
`;
const Slider = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  div:last-child {
    margin-bottom: 80px;
  }
`;
const Book = styled(motion.div)`
  display: flex;
  background-color: ${props => props.theme.gray.lightdark};
  width: 95%;
  height: 200px;
  margin: 30px 0px;
  border-radius: 7px;
  div {
    margin-top: 10px;
    margin-left: 20px;
  }
`;
const BookImg = styled.div`
  background-color: red;
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
const ArrowWrapper = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  position: relative;
  height: 150px;
  h1 {
    font-size: 32px;
    position: absolute;
    left: 50%;
  }
  svg:first-child {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
    cursor: pointer;
  }
  svg:last-child {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 0;
    cursor: pointer;
  }
`;
const sliderVariants = {
  initial: (isNext: boolean) => ({
    x: isNext ? window.outerWidth : -window.outerWidth,
  }),
  animate: { x: 0 },
  exit: (isNext: boolean) => ({
    x: isNext ? -window.outerWidth : window.outerWidth,
  }),
};
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;
interface IForm {
  keyword: string;
}
const offset = 5;

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const bookDetailMatch = useMatch(`/search/book-detail/:bookId`);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isNext, setNext] = useState(true);
  const { register, handleSubmit } = useForm<IForm>();
  //useQuery로 검색결과 받아오는 코드 작성 필요!!
  const data = [
    {
      id: 100,
      bookName: "국부론",
      isbn: 0,
      author: "저자1",
      company: "com0",
      bookImg: "",
      floor: "지하1층",
      shelfname: "일반도서",
      loaction: { shelffloor: 0, shelfleft: 0 },
    },
    {
      id: 101,
      bookName: "공산당 선언",
      isbn: 1,
      author: "저자1",
      company: "com1",
      bookImg: "",
      floor: "1층",
      shelfname: "책장 이름1",
      loaction: { shelffloor: 1, shelfleft: 1 },
    },
    {
      id: 102,
      bookName: "책2",
      isbn: 2,
      author: "저자2",
      company: "com2",
      bookImg: "",
      floor: "2층",
      shelfname: "책장 이름2",
      loaction: { shelffloor: 2, shelfleft: 2 },
    },
    {
      id: 103,
      bookName: "책3",
      isbn: 3,
      author: "저자3",
      company: "com3",
      bookImg: "",
      floor: "3층",
      shelfname: "책장 이름3",
      loaction: { shelffloor: 3, shelfleft: 3 },
    },
    {
      id: 104,
      bookName: "책4",
      isbn: 4,
      author: "저자4",
      company: "com4",
      bookImg: "",
      floor: "4층",
      shelfname: "책장 이름4",
      loaction: { shelffloor: 4, shelfleft: 4 },
    },
    {
      id: 105,
      bookName: "책5",
      isbn: 5,
      author: "저자5",
      company: "com5",
      bookImg: "",
      floor: "5층",
      shelfname: "책장 이름5",
      loaction: { shelffloor: 5, shelfleft: 5 },
    },
    {
      id: 106,
      bookName: "책6",
      isbn: 6,
      author: "저자6",
      company: "com6",
      bookImg: "",
      floor: "6층",
      shelfname: "책장 이름6",
      loaction: { shelffloor: 6, shelfleft: 6 },
    },
  ];

  const onBookClick = (bookId: number) => {
    navigate(`/search/book-detail/${bookId}`);
  };
  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setNext(true);
    setIndex(prev =>
      prev === Math.floor(data.length / offset) ? 0 : prev + 1
    );
  };
  const decreaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setNext(false);
    setIndex(prev =>
      prev === 0 ? Math.floor(data.length / offset) : prev - 1
    );
  };
  const toggleLeaving = () => {
    setLeaving(prev => !prev);
  };
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };
  const onOverlayClick = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Banner>
        <Title>검색결과 [{searchParams.get("keyword")}]</Title>
      </Banner>
      <InfoWrapper>
        <SearchForm onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("keyword", { required: true })}
            placeholder="도서명 또는 저자를 검색하세요."
          />
          <SearchBtn>
            <input type="submit" id="btnSubmit" style={{ display: "none" }} />
            <label htmlFor="btnSubmit">
              <SearchIcon style={{ cursor: "pointer" }} />
            </label>
          </SearchBtn>
        </SearchForm>
        <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
          <Slider
            key={index}
            custom={isNext}
            variants={sliderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "tween", duration: 0.2 }}
          >
            {data.slice(index * offset, index * offset + offset).map(book => (
              <Book
                key={book.id}
                layoutId={book.id + ""}
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
            <ArrowWrapper>
              <LeftArrow onClick={decreaseIndex} />
              <h1>{index + 1}</h1>
              <RightArrow onClick={increaseIndex} />
            </ArrowWrapper>
          </Slider>
        </AnimatePresence>
        <AnimatePresence>
          {bookDetailMatch && (
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1, transition: { type: "tween" } }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
      </InfoWrapper>
    </Wrapper>
  );
};

export default Search;
