import React, { useState } from "react";

const Signup = () => {
  const [signupUserData, setSignupUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const signupChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSignupUserData({ ...signupUserData, [name]: value });
  };
  const signupUser = async (e) => {
    e.preventDefault();
    let { name, email, password } = signupUserData;
    if (!name || !email || !password || password.length < 6) {
      alert("Fill all the fields and password length should be greater than 6");
    } else {
      try {
        let res = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        setSignupUserData({ name: "", email: "", password: "" });
        if (res.status === 200) {
          alert("User registered Successfully!");
        }
        else if(res.status===401){
          alert("User already Registered")
        }
        else{
          alert(res.status, "Something Wrong!")
        }
      } catch (error) {
        alert("Something Went Wrong");
      }
    }
  };
  return (
    <div className="signup-user">
      <div className="row">
        <h2 className="text-center">SignUp Here</h2>
        <div className="signup-content">
          <div className="col-md-6 col-sm-12">
            <form method="POST">
              <div className="form-group mt-2">
                <label>Enter Name</label>
                <input
                  type="name"
                  className="form-control mt-1"
                  placeholder="Enter name"
                  required
                  name="name"
                  onChange={signupChangeHandler}
                  value={signupUserData.name}
                />
              </div>
              <div className="form-group mt-2">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  required
                  name="email"
                  onChange={signupChangeHandler}
                  value={signupUserData.email}
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
                  onChange={signupChangeHandler}
                  value={signupUserData.password}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={signupUser}
              >
                SignUP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
