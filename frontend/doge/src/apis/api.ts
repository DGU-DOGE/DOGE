import axios from "axios";

// 로그인이 되었다면, 즐겨찾기나 다른 fetch요청시에 headers속성에 accessToken값을 넣어주어야 하므로,
// 해당 값을 참고하여 필요한 부분에 설정해 주는 과정이 필요하다.
export interface IUserData {
  userId: string;
  userPassword: string;
}

export const fetchLogin = async (userData: IUserData) => {
  const { data } = await axios.post(``, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};
export const fetchJoin = async (userData: IUserData) => {
  const { data } = await axios.post(``, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};
export const fetchSearch = async (keyword: string) => {
  // 로그인이 되었는지를 확인하고 로그인이 되었을 경우에
  // locaStorage에 저장된 accessToken을 가져와서 axios.get요청에 Authenication으로 넣기
  // + withCredentials: true설정해주기
  const { data } = await axios.get(``); // get url뒤에 keyword붙여서 요청할 것
  return data;
};
export const fetchFavorite = async () => {
  // 로그인이 되었는지를 확인하고 로그인이 되었을 경우에
  // locaStorage에 저장된 accessToken을 가져와서 axios.get요청에 Authenication으로 넣기
  // + withCredentials: true설정해주기
  const { data } = await axios.get(``);
  return data;
};
//백엔드에 해당 이메일로 인증번호를 요청하는 함수
export const fetchSendCode = async (email: string) => {
  const { data } = await axios.post(
    ``,
    { email },
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
    ``,
    {
      email: userData.userId,
      verifyNumber: userData.verifyNumber,
    },
    { withCredentials: true }
  );
  return data;
};
