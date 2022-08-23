import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
const About = () => {
  let { user, loggedIn, setUser } = useContext(AuthContext);
  let navigate = useNavigate();
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
      setUser(response.user, true);
    } else {
      setUser(null, false);
      navigate("/login");
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <>
      {loggedIn ? (
        <div className="container">
          <div className="about">
            <h1 className="text-center mt-5">About</h1>
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <h3> {user.name}</h3>
              </div>
              <div className="col-md-4 col-sm-12">
                <h3> {user.email}</h3>
              </div>
              <div className="col-md-4 col-sm-12">
                <h3>{user.password}</h3>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default About;
