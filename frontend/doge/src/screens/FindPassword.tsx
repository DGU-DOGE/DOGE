import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  fetchChangePassword,
  fetchConfirmCode,
  fetchSendCode,
} from "../apis/api";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import PageBanner from "../components/PageBanner";
import Alert from "../components/Alert";

interface IJoin {
  userId: string;
  verifyNumber: string;
  userPassword: string;
  userPassword1: string;
}

const FindPassword = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IJoin>({ mode: "onSubmit" });

  // 인증번호 발송에 대한 함수
  const { mutate: sendVerificationCode } = useMutation(fetchSendCode, {
    onSuccess: () => {
      console.log("인증번호 발송 성공");
    },
    onError: (error) => {
      console.error("인증번호 발송 실패", error);
    },
  });
  // 인증번호 검증을 위한 함수
  const { mutate: verifyCode } = useMutation(fetchConfirmCode, {
    onSuccess: () => {
      console.log("인증번호 인증 과정 성공!");
    },
    onError: (error) => {
      console.log("인증번호 인증 과정 실패", error);
    },
  });
  // 비밀번호 변경 post요청 함수
  const { mutate: changePassword } = useMutation(fetchChangePassword, {
    onSuccess: () => {
      console.log("비밀번호 변경 성공!");
      navigate(`/login`);
    },
    onError: (error) => {
      console.log("비밀번호 변경 실패!", error);
    },
  });
  const onValid = (data: IJoin) => {
    // 비밀번호와 비밀번호확인이 일치하지 않으면 에러발생하도록 구현
    if (verificationSuccess && data.userPassword !== data.userPassword1) {
      setError(
        "userPassword1",
        { message: "비밀번호가 일치하지 않습니다" },
        { shouldFocus: true }
      );
      return;
    }
    try {
      if (!verificationSent) {
        sendVerificationCode(data.userId, {
          onSuccess: () => {
            console.log("인증번호 발송!");
            setVerificationSent(true);
            startTimer();
          },
          onError: (error) => {
            console.error("인증번호 발송 실패", error);
          },
        });
      } else {
        if (!verificationSuccess) {
          verifyCode(
            { userId: data.userId, verifyNumber: data.verifyNumber },
            {
              onSuccess: () => {
                setValue("userPassword", "");
                if (timer > 0) {
                  setVerificationSuccess(true);
                  console.log("인증번호 인증 성공!");
                } else {
                  console.log("인증번호 실패!");
                  setVerificationSuccess(false);
                  alert(`인증실패`);
                  navigate(`/find-password`);
                }
              },
              onError: (error) => {
                console.log("인증번호 인증 실패", error);
              },
            }
          );
        } else {
          changePassword(
            { userId: data.userId, userPassword: data.userPassword },
            {
              onSuccess: () => {
                console.log("비밀번호 변경 성공!");
                navigate("/login");
              },
              onError: (err) => {
                console.log("비밀번호 변경 실패!", err);
              },
            }
          );
        }
      }
    } catch (error) {
      console.log("인증번호, 회원가입, 인증번호 요청 문제");
    }
  };
  const startTimer = () => {
    setTimer(180); // 3분을 초 단위로 설정
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 180000);
  };

  return (
    <>
      <Wrapper>
        <PageBanner>
          <h1>
            동국대학교 <br />
            중앙<span>도</span>서관 <span>지</span>도 <br />
            <span>비밀번호 찾기</span>
          </h1>
        </PageBanner>
      </Wrapper>
      <JoinWrapper>
        <JoinForm onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("userId", {
              required: "이메일을 입력해주세요",
              pattern: {
                value:
                  /^(.+)@(dongguk\.edu|dgu\.edu|mail\.dgu\.edu|mail\.dongguk\.edu|dgu\.ac\.kr)$/,
                message: "올바른 동국대학교 이메일 형식을 입력해주세요",
              },
            })}
            placeholder="이메일을 입력하세요"
          />
          {errors.userId && errors.userId.type === "required" && (
            <Alert>{errors.userId.message}</Alert>
          )}
          {errors.userId && errors.userId.type === "pattern" && (
            <Alert>{errors.userId.message}</Alert>
          )}
          {!verificationSuccess ? (
            !verificationSent ? (
              <input
                type="submit"
                value={`인증번호 발송`}
                style={{
                  position: "absolute",
                  top: 95,
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "80%",
                  marginRight: 10,
                  fontSize: "24px",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#E17100",
                }}
              />
            ) : null
          ) : null}

          {verificationSent ? (
            !verificationSuccess ? (
              <>
                <Input
                  {...register("verifyNumber", {
                    required: "인증번호를 입력해주세요",
                  })}
                  placeholder="인증번호"
                />
                <Timer>
                  <span>{formatTime(timer)}</span>
                </Timer>
                {errors.verifyNumber &&
                  errors.verifyNumber.type === "required" && (
                    <Alert>{errors.verifyNumber.message}</Alert>
                  )}
                <Input type="submit" value="인증하기" />
              </>
            ) : (
              <>
                <Input
                  type="password"
                  {...register("userPassword", {
                    required: "비밀번호를 입력하세요",
                  })}
                  placeholder="비밀번호"
                />
                {errors.userPassword &&
                  errors.userPassword.type === "required" && (
                    <Alert>{errors.userPassword.message}</Alert>
                  )}
                <Input
                  type="password"
                  {...register("userPassword1", {
                    required: "다시 한번 비밀번호를 입력하세요",
                  })}
                  placeholder="비밀번호 확인"
                />
                {errors.userPassword1 && (
                  <Alert>{errors.userPassword1.message}</Alert>
                )}
                <Input type="submit" value="비밀번호 변경" />
              </>
            )
          ) : null}
        </JoinForm>
      </JoinWrapper>
    </>
  );
};

export default FindPassword;

const Wrapper = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: column;
`;
const JoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 800px;
`;
const JoinForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  input:focus {
    background-color: transparent;
  }
  input[type="submit"] {
    cursor: pointer;
    background-color: ${(props) => props.theme.orange};
    color: ${(props) => props.theme.white.lighter};
    font-size: 30px;
  }
  padding-top: 70px;
`;
const Input = styled.input`
  width: 80%;
  height: 60px;
  margin: 10px;
  background-color: ${(props) => props.theme.gray.medium};
  border: 1px solid ${(props) => props.theme.gray.medium};
  border-radius: 10px;
  padding: 10px;
  font-size: 24px;
`;
const Timer = styled.div`
  display: flex;
  width: 80%;
  position: relative;
  span {
    position: absolute;
    top: -50px;
    right: 20px;
    font-size: 18px;
  }
`;
