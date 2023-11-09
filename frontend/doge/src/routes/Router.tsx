import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Join from "../screens/Join";
import UserInfo from "../screens/UserInfo";
import Favorites from "../screens/Favorites";
import Logout from "../screens/Logout";
import Search from "../screens/Search";

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
        path: "logout",
        element: <Logout />,
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
    ],
  },
]);

export default router;
