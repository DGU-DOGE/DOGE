import App from "../App";
import Home from "../pages/Home";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Search from "../pages/Search";
import UserInfo from "../pages/UserInfo";
import Favorites from "../pages/Favorites";
import FindPassword from "../pages/FindPassword";
import DeleteAccount from "../pages/DeleteAccount";
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
