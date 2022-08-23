import React, { useReducer, createContext } from "react";
import reducer from "./reducer";
let initialState = {
  user: null,
  loggedIn: false,
};
let AuthContext = createContext();
const AuthenticationContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let setUser = (user, loggedIn) => {
    dispatch({type:"SET_USER", payload:{user, loggedIn}})
  };
  return (
    <AuthContext.Provider value={{ ...state, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationContext;
export { AuthContext };
