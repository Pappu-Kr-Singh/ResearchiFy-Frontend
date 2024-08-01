import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function SideBar({ isAuthenticated }) {
  const [auth, setAuth] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
    }
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-body-dark sidebar"
        style={{ width: "320px" }}
      >
        <Link
          to={"/create-todo"}
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto  text-decoration-none"
        >
          <div className="fs-4 ">
            <img className="logo" src="/todo_logo.png" alt="" />
          </div>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {!currentUser ? (
            <>
              <li className="nav-item">
                <Link to={"/sign-up"} className="nav-link ">
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#table"></use>
                  </svg>
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link ">
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#grid"></use>
                  </svg>
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link border-bottom border-dark"
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#people-circle"></use>
                </svg>
                Profile
              </Link>
            </li>
          )}
        </ul>
        <hr />
      </div>
    </>
  );
}

export default SideBar;
