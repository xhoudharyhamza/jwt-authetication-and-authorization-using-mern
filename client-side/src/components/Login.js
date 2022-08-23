import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate= useNavigate()
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });
  const loginChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginUserData({ ...loginUserData, [name]: value });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    let { email, password } = loginUserData;
    if (!email || !password) {
      alert("Please fill all the fields");
    } else {
      try {
        let res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        setLoginUserData({ email: "", password: "" });
        if (res.status === 404) {
          alert("Something Went Wrong!");
        } else if (res.status === 401) {
          alert("Invalid Credentials");
        } else if (res.status === 200) {
          navigate('/')
        }
      } catch (error) {}
    }
  };
  return (
    <div className="login-user">
      <div className="row">
        <h2 className="text-center">LogIn Here</h2>
        <div className="login-content">
          <div className="col-md-6 col-sm-12">
            <form method="POST">
              <div className="form-group mt-2">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  required
                  name="email"
                  onChange={loginChangeHandler}
                  value={loginUserData.email}
                />
              </div>
              <div className="form-group mt-2">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                  required
                  name="password"
                  onChange={loginChangeHandler}
                  value={loginUserData.password}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={loginUser}
              >
                LogIn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
