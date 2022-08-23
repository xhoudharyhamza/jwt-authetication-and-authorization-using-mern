import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Logout = () => {
    let navigate= useNavigate()
  let logoutUser = async () => {
    let res = await fetch("/logout", {
      method: "GET",
      Accept: "application/json",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(res.status==200){
        navigate('/')
    }
    else{
        navigate('/')
    }
  };
  useEffect(() => {
    logoutUser();
  }, []);
  return <></>;
};
