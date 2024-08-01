import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import Profile from "./components/Profile.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";
import CreateTodo from "./components/CreateTodo.jsx";
import TodoList from "./components/TodoList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <SignUp /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact-us", element: <Contact /> },
      { path: "/create-todo", element: <CreateTodo /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
