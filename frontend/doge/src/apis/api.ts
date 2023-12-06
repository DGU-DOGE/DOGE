import { getCookie } from "../stores/Cookie";
import { IDelete } from "../pages/DeleteAccount";
import axios from "axios";

export interface IUserData {
  userId: string;
  userPassword: string;
}
export interface IBook {
  bookId: number;
  callNumber: string;
  bookName: string;
  author: string;
  publisher: string;
  photoLink: string;
  floor: string;
  shelfName: string;
  shelfCount: number;
  bookRow: number;
  bookCell: number;
}

// 회원 탈퇴 함수
export const fetchDeleteUser = async (userData: IDelete) => {
  return axios.post(
    `/api/user/delete`,
    { password: userData.password },
    {
      headers: {
        sessionId: await getCookie("sessionId"),
      },
      withCredentials: true,
    }
  );
};
// 즐겨찾기 등록 함수
export const fetchAddFavorite = async (favoriteData: IBook) => {
  return axios.post(
    `/api/favorite/post`,
    {
      book: favoriteData,
    },
    {
      headers: {
        sessionId: await getCookie("sessionId"),
      },
      withCredentials: true,
    }
  );
};
// 즐겨찾기 삭제 함수
export const fetchDeleteFavorite = async (deleteData: IBook) => {
  return axios.post(
    `/api/favorite/delete`,
    {
      bookId: deleteData.bookId,
    },
    {
      headers: {
        sessionId: await getCookie("sessionId"),
      },
      withCredentials: true,
    }
  );
};
//백엔드에 해당 이메일로 인증번호를 요청하는 함수
export const fetchSendCode = async (email: string) => {
  return axios.post(
    `/api/email/send-email`,
    { authEmail: email },
    {
      withCredentials: true,
    }
  );
};
//백엔드에 인증번호 인증에 대해 요청하는 함수
export const fetchConfirmCode = async (userData: {
  userId: string;
  verifyNumber: string;
}) => {
  return axios.post(
    `/api/email/validate-number`,
    {
      authEmail: userData.userId,
      authNumber: userData.verifyNumber,
    },
    { withCredentials: true }
  );
};
// 사용자 회원가입 함수
export const fetchJoin = async (userData: IUserData) => {
  return axios.post(
    `/api/user/join`,
    { email: userData.userId, password: userData.userPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};
// 비밀번호 변경에 대한 함수
export const fetchChangePassword = async (userData: IUserData) => {
  return axios.patch(
    "/api/user/change-password",
    { email: userData.userId, password: userData.userPassword },
    {
      withCredentials: true,
    }
  );
};
//로그아웃에 대한 함수
export const fetchLogout = (userData: { sessionId: string }) => {
  return axios.post(
    "/api/user/logout",
    { sessionId: userData.sessionId },
    { withCredentials: true }
  );
};
