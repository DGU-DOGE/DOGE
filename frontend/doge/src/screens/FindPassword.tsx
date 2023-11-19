import { ReactComponent as ElephantLogo } from "../assets/imgs/dgu-elephant.svg";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { fetchConfirmCode, fetchJoin, fetchSendCode } from "../apis/api";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/formatTime";

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
const AlertMessage = styled.span`
  width: 80%;
  margin-left: 23px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.orange};
  font-size: 20px;
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
interface IJoin {
  userId: string;
  verifyNumber: string;
  userPassword: string;
  userPassword1: string;
}

const FindPassword = () => {
  return <h1>findPassword</h1>;
};

export default FindPassword;
