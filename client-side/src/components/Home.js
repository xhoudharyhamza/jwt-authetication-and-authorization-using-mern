import React, { useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthenticationContext";
const Home = () => {
  let { user, loggedIn, setUser } = useContext(AuthContext);
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
    <>
    {user?<h2 className="text-center mt-5">Welcome to Home Route {user.email}</h2>:<h2 className="text-center mt-5">Welcome to Home Route</h2>}
    </>
  )
};

export default Home;
