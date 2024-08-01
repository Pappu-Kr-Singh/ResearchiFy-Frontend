import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(currentUser);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://researchify-todo-backend-6fzs.onrender.com/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
          },
        }
      );
      // console.log(response.data);
      alert("Logout Successful");
      setCurrentUser(null);
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <>
      <header className="bg-light p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to={"/create-todo"} className="nav-link px-2 ">
                  Add Todo
                </Link>
              </li>
              <li>
                <Link to={"/about-us"} className="nav-link px-2 ">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"} className="nav-link px-2 ">
                  Contact us
                </Link>
              </li>
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 search__input"
              role="search"
            ></form>

            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-black text-capitalize font-weight-bold"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentUser ? (
                  <span className="m-2">
                    <img
                      src={
                        currentUser?.data?.user?.avatar || "default-avatar-url"
                      }
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />{" "}
                    {currentUser.data.user.userName}
                  </span>
                ) : (
                  ""
                )}
              </a>
              <ul className="dropdown-menu text-small" style={{}}>
                <li>
                  <Link
                    to={"/profile"}
                    className="dropdown-item bg-light"
                    href="#"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Sign out
                  </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
