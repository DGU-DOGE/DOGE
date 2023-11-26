import axios from "axios";

// 로그인이 되었다면, 즐겨찾기나 다른 fetch요청시에 headers속성에 accessToken값을 넣어주어야 하므로,
// 해당 값을 참고하여 필요한 부분에 설정해 주는 과정이 필요하다.
export interface IUserData {
  userId: string;
  userPassword: string;
}
export interface IBook {
  id: number;
  callNumber: string;
  bookName: string;
  author: string;
  publisher: string;
  photoLink: string;
  floor: string;
  shelfname: string;
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
  // 로그인이 되었는지를 확인하고 로그인이 되었을 경우에
  // locaStorage에 저장된 accessToken을 가져와서 axios.get요청에 Authenication으로 넣기
  // + withCredentials: true설정해주기
  const { data } = await axios.get(`/search?keyword=${keyword}`, {
    withCredentials: true,
  }); // get url뒤에 keyword붙여서 요청할 것
  return data;
};

//사용자의 정보 (email, 즐겨찾기 목록 등)를 받아오는 함수
export const fetchUserData = async () => {
  // 로그인이 되었는지를 확인하고 로그인이 되었을 경우에
  // locaStorage에 저장된 accessToken을 가져와서 axios.get요청에 Authenication으로 넣기
  // + withCredentials: true설정해주기
  const { data } = await axios.get(``);
  return data;
};
export const fetchAddFavorite = async (favoriteData: {
  userId: string;
  book: IBook;
}) => {
  // 로그인이 되었는지를 확인하고 로그인이 되었을 경우에
  // locaStorage에 저장된 accessToken을 가져와서 axios.get요청에 Authenication으로 넣기
  // + withCredentials: true설정해주기
  const { data } = await axios.post(
    ``,
    { email: favoriteData.userId, bookInfo: favoriteData.book },
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
  const { data } = await axios.put(
    ``,
    { email: userData.userId, password: userData.userPassword },
    {
      withCredentials: true,
    }
  );
};
