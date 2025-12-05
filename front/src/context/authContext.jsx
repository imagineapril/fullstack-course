import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser, setUser } from "../store/userSlice";
import * as jose from 'jose';

const AuthContext = createContext({});

export const useAuthContext = () =>  useContext(AuthContext);

export const AuthContextProvider = ({ children }) =>  {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem('token') || null);

  const isLogin = () => !!token;

  const logIn = (token) =>  {
    window.localStorage.setItem('token', token);
    setToken(token);
    navigate('/');
  };

  const logOut = () =>  {
    window.localStorage.removeItem('token');
    setToken(null);
    dispatch(removeUser());
    navigate('/login');
  };

  useEffect(() => {
    if (token) {
      const { userId, email, role } = jose.decodeJwt(token);
      dispatch(setUser({userId, email, role}));
    }
  },[token]);

  return <AuthContext.Provider value={{ token, logIn, logOut }}>{ children }</AuthContext.Provider>
};