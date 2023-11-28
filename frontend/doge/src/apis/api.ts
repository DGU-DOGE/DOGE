import axios from "axios";
import { IFavorite } from "../screens/Search";
import { IDelete } from "../screens/DeleteAccount";
import { getCookie } from "../stores/Cookie";

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
  shelfnum: number;
  bookRow: number;
  bookCell: number;
}
export const fetchLogin = async (userData: IUserData) => {
  const payload = { email: userData.userId, password: userData.userPassword };
  const { data } = await axios.post(`/api/user/login`, payload, {
    withCredentials: true,
  });
  return data;
};
export const fetchJoin = async (userData: IUserData) => {
  const { data } = await axios.post(
    `/api/user/join`,
    { email: userData.userId, password: userData.userPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
};
export const fetchSearch = async (keyword: string | null) => {
  const { data } = await axios.get(`/search?keyword=${keyword}`, {
    withCredentials: true,
  }); // get url뒤에 keyword붙여서 요청할 것
  return data;
};

//사용자의 정보 (email)를 받아오는 함수
export const fetchUserData = async () => {
  const { data } = await axios.get(``);
  return data;
};
export const fetchAddFavorite = async (favoriteData: IFavorite) => {
  const { data } = await axios.post(
    `/api/favorite/post`,
    { book: favoriteData.book, sessionId: favoriteData.sessionId },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
};
//백엔드에 해당 이메일로 인증번호를 요청하는 함수
export const fetchSendCode = async (email: string) => {
  const { data } = await axios.post(
    `/api/email/send-email`,
    { authEmail: email },
    {
      withCredentials: true,
    }
  );
  return data;
};
//백엔드에 인증번호 인증에 대해 요청하는 함수
export const fetchConfirmCode = async (userData: {
  userId: string;
  verifyNumber: string;
}) => {
  const { data } = await axios.post(
    `/api/email/validate-number`,
    {
      authEmail: userData.userId,
      authNumber: userData.verifyNumber,
    },
    { withCredentials: true }
  );
  return data;
};

// 비밀번호 변경에 대한 함수 + 비밀번호를 변경하는 경우 기존 유저에 대한 새로운 accessToken을 부여받게 되는 것인지도 확인할것
export const fetchChangePassword = async (userData: IUserData) => {
  const { data } = await axios.patch(
    "/api/user/change-password",
    { email: userData.userId, password: userData.userPassword },
    {
      withCredentials: true,
    }
  );
  return data;
};

// 회원 탈퇴 함수
export const fetchDeleteUser = async (userData: IDelete) => {
  const { data } = await axios.post(
    `/api/user/delete`,
    { password: userData.password },
    {
      headers: {
        sessionId: await getCookie("sessionId"),
      },
      withCredentials: true,
    }
  );
  return data;
};

// 사용자 로그아웃 함수
export const fetchUserLogout = async () => {
  const { data } = await axios.post(`/api/ersu / logout`, {
    withCredentials: true,
  });
  return data;
};
