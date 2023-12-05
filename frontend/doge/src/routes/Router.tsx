import App from "../App";
import Home from "../screens/Home";
import Join from "../screens/Join";
import Login from "../screens/Login";
import Search from "../screens/Search";
import UserInfo from "../screens/UserInfo";
import Favorites from "../screens/Favorites";
import FindPassword from "../screens/FindPassword";
import DeleteAccount from "../screens/DeleteAccount";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "map-detail/:mapId",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "search/book-detail/:bookId",
        element: <Search />,
      },
      { path: "userInfo", element: <UserInfo /> },
      { path: "favorites", element: <Favorites /> },
      { path: "favorites/book-detail/:bookId", element: <Favorites /> },
      { path: "find-password", element: <FindPassword /> },
      { path: "delete-account", element: <DeleteAccount /> },
    ],
  },
]);

export default router;
