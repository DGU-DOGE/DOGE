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
export const fetchFavorite = async () => {
  // 저장된 accessToken을 가져와서 axios.get요청에 Authenication으로 넣기
  // + withCredentials: true설정해주기
  const { data } = await axios.get(``);
  return data;
};
