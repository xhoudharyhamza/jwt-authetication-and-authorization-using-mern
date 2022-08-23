import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthenticationContext";
const Navbar = () => {
  let { user, loggedIn, setUser } = useContext(AuthContext)
  let verifyUser = async () => {
    let res = await fetch("/auth", {
      method: "GET",
      Accept: "application/json",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await res.json();
    if (res.status === 200) {
      setUser(response.user, response.loggedIn);
    } else {
      setUser(null, false);
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        MERN App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          {!loggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  SignUp
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {user.email}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
