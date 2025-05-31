import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Chat from "./components/Chat";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path:"/connection",
        element:<Connections/>
      },
      {
        path:"/request",
        element:<Request/>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path:"/chat/:targetUserId",
        element:<Chat/>
      }
    ],
  },
]); 


const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />{" "}
        <ToastContainer position="top-center" autoClose={2000} />
      </Provider>
    </div>
  );
};

export default App;
